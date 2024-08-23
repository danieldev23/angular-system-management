import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RedirectService {
	constructor(
		private router: Router
	) {}
	
	redirectLogin(): void {
		this.router.navigate(['/auth/login']);
	}
	
	redirectNetworkHome(): void {
		this.router.navigate(['/admin/dashboard']);
	}
}
