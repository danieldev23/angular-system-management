import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor {
	constructor(private commonService: CommonService, private userService: UserService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith(environment.auto_base_backend_api)) {
			// Check param url with info -> add to azt-object base64
			let objHeaderValue: string = '';
			let objHeaderParam = this.getParameterByName('objHeader', request.urlWithParams);
			if (objHeaderParam) {
				objHeaderValue = this.commonService.base64ObjHeader(objHeaderParam);
			}
			// Add access token to header
			let hasBearToken = false;
			if (request.headers) {
				let headers = request.headers as HttpHeaders;
				let firstAuthorization = headers.get('authorization');
				let secondAuthorization = headers.get('Authorization');
				if (firstAuthorization || secondAuthorization) {
					hasBearToken = true;
				}
			}
			if (hasBearToken == false) {
				let curToken = this.userService.getToken();
				let bearTokenInParam = this.getParameterByName('bearToken', request.urlWithParams);

				if (bearTokenInParam) {
					curToken = bearTokenInParam;
				}
				if (objHeaderValue != '') {
					request = request.clone({
						setHeaders: {
							object: objHeaderValue,
							Authorization: `Bearer ${curToken}`,
						},
					});
				} else {
					request = request.clone({
						setHeaders: {
							Authorization: `Bearer ${curToken}`,
						},
					});
				}
			} else if (objHeaderValue != '') {
				request = request.clone({
					setHeaders: {
						object: objHeaderValue,
					},
				});
			}
			return next.handle(request);
		} else {
			return next.handle(request);
		}
	}

	getParameterByName(name: string, url: string): string | null {
		name = name.replace(/[\[\]]/g, '\\$&');
		let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
		let results = regex.exec(url);
		if (!results) {
			return null;
		}
		if (!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
}
