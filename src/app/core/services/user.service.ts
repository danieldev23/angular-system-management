import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser.storage.service';
import { User } from '../auto_api/backend';

@Injectable({ providedIn: 'root' })
export class UserService {
	tokenSave: string = '';
	constructor(private browserStorageService: BrowserStorageService) {}
	logout(): void {
		this.browserStorageService.removeStorage('user_obj');
		this.browserStorageService.removeStorage('user_token');
	}

	saveUserObj(userObj: User, token: string): void {
		this.browserStorageService.saveStorage('user_obj', JSON.stringify(userObj));
		this.browserStorageService.saveStorage('user_token', token);
	}

	getUserObj(): User | undefined {
		return this.browserStorageService.getUserObj();
	}

	//Get info
	getToken(): string {
		const tokenTest = this.browserStorageService.getStorage('user_token');
		return tokenTest ?? '';
	}

	setToken(token: string): void {
		this.browserStorageService.saveStorage('user_token', token);
	}
	
	isLogin(): boolean {
		return this.browserStorageService.getUserObj() !== undefined;
	}

	get avatar(): string {
		const userObj = this.getUserObj() ?? {};
		userObj.avatar = userObj.avatar ?? '';
		return userObj.avatar.length === 0 ? '/assets/default-avatar.jpg' : userObj.avatar;
	}
}
