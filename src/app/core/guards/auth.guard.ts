import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { RedirectService } from '../services/redirect.service';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	constructor(private userService: UserService, private redirectService: RedirectService) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.userService.isLogin()) {
			return true;
		} else {
			this.redirectService.redirectLogin();
			return false;
		}
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
	canLoad(route: Route): boolean {
		if (this.userService.isLogin()) {
			return true;
		} else {
			this.redirectService.redirectLogin();
			return false;
		}
	}
}
