import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { RedirectService } from '../services/redirect.service';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class GuestGuard {
	constructor(private userService: UserService, private redirectService: RedirectService) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.userService.isLogin()) {
			this.redirectService.redirectNetworkHome();
			return false;
		} else {
			return true;
		}
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}
	canLoad(route: Route): boolean {
		const url = `/${route.path}`;
		if (this.userService.isLogin()) {
			this.redirectService.redirectNetworkHome();
			return false;
		} else {
			return true;
		}
	}
}
