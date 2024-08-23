import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { RedirectService } from '../services/redirect.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	constructor(private commonService: CommonService, private redirectService: RedirectService, private userService: UserService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (request.url.startsWith(environment.auto_base_backend_api)) {
			return next.handle(request).pipe(
				map((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						event = event.clone({ body: this.modifyBody(request.urlWithParams, event.body) });
					}
					return event;
				}),
				catchError((error: HttpErrorResponse) => {
					return this.handleError(true, error);
				}),
			);
		} else {
			return next.handle(request);
		}
	}
	private modifyBody(url: string, response: any): void {
		if (response && response.success == 0 && response.code == 401) {
			this.userService.logout();
			this.redirectService.redirectLogin();
		}
	}
	replaceApiDomain(message: string): string {
		return message.replace(environment.auto_base_backend_api, '');
	}
	private handleError(ownApi: boolean, error: HttpErrorResponse): Observable<any> {
		var data = {};
		if (error && error.status == 401 && ownApi) {
			data = { code: 401, data: null, detailMessage: '', message: 'lang_cms_error_unauthen', new_user: null, success: 0, version: '' };
			this.userService.logout();
			this.redirectService.redirectLogin();
		} else {
			if (error.error instanceof ErrorEvent) {
				data = { code: 999, data: null, detailMessage: '', message: 'lang_cms_error_javascript' + error.status + '|' + this.replaceApiDomain(error.message).substring(0, 150), new_user: null, success: 0, version: '' };
			} else {
				data = { code: 1000, data: null, detailMessage: '', message: 'lang_cms_error_lost_connect_to_server' + error.status + '|' + this.replaceApiDomain(error.message).substring(0, 150), new_user: null, success: 0, version: '' };
			}
		}
		return of(
			new HttpResponse({
				status: 200,
				body: data,
			}),
		);
	}
}
