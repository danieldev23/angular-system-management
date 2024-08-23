import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../auto_api/backend';

@Injectable({
	providedIn: 'root',
})
export class BrowserStorageService {
	constructor(private cookieService: CookieService) {}

	//Save localStorage and cookie
	saveStorageAndCookie(key: string, value: string): void {
		let validStorage = false;
		try {
			localStorage.setItem(key, value);
			validStorage = true;
		} catch (ex) {}

		if (!validStorage || this.iOS()) {
			try {
				let expiredDate = new Date();
				expiredDate.setDate(new Date().getDate() + 24 * 30 * 12 * 2);
				this.cookieService.set(key, value, expiredDate, '/');
			} catch (ex) {}
		}
	}

	// Local storage utils
	saveStorage(key: string, value: string): void {
		let validStorage = false;
		try {
			localStorage.setItem(key, value);
			validStorage = true;
		} catch (ex) {}
		if (!validStorage) {
			try {
				let expiredDate = new Date();
				expiredDate.setDate(new Date().getDate() + 24 * 30 * 12 * 2);
				this.cookieService.set(key, value, expiredDate, '/');
			} catch (ex) {}
		}
	}
	saveStorageWithoutCookie(key: string, value: string): void {
		try {
			localStorage.setItem(key, value);
		} catch (ex) {}
	}
	getStorage(key: string): string | null {
		let validStorage = false;
		let data = null;
		try {
			data = localStorage.getItem(key);
			if (data == null) {
				data = this.cookieService.get(key);
			}
			validStorage = true;
			return data;
		} catch (ex) {}
		if (!validStorage) {
			try {
				data = this.cookieService.get(key);
				validStorage = true;
				return data;
			} catch (ex) {}
		}
		return null;
	}
	removeStorage(key: string): void {
		try {
			this.cookieService.delete(key, '/');
			localStorage.removeItem(key);
		} catch (ex) {}
	}
	getSizeOfStorage(): number {
		try {
			let sizeTotal = 0;
			let keyLength;
			let key;
			for (key in localStorage) {
				if (!localStorage.hasOwnProperty(key)) {
					continue;
				}
				keyLength = (localStorage[key].length + key.length) * 2;
				sizeTotal += keyLength;
			}
			return sizeTotal / 1024 / 1024; // MB
		} catch (ex) {
			return 0;
		}
	}
	getSizeOfStorageByKey(keyFound: string): number {
		try {
			let sizeTotal = 0;
			let keyLength;
			let key;
			for (key in localStorage) {
				if (!key.includes(keyFound)) {
					continue;
				} else {
					keyLength = (localStorage[key].length + key.length) * 2;
					sizeTotal += keyLength;
				}
			}
			return sizeTotal / 1024 / 1024; // MB
		} catch (ex) {
			return 0;
		}
	}
	// Simple localStorage utils
	saveSimpleStorage(key: string, value: string): void {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return;
			key = userObj.id + '_' + key;
			localStorage.setItem(key, value);
		} catch (ex) {}
	}
	getSimpleStorage(key: string): string | undefined {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return undefined;
			key = userObj.id + '_' + key;
			let localValue = localStorage.getItem(key);
			if (localValue != null) {
				return localValue;
			} else {
				return undefined;
			}
		} catch (ex) {}
		return undefined;
	}
	removeSimpleStorage(key: string): void {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return;
			key = userObj.id + '_' + key;
			localStorage.removeItem(key);
		} catch (ex) {}
	}
	removeExceptSimpleStorage(key: string, hashId: string): void {
		try {
			for (let localKey in localStorage) {
				if (!localKey.includes(key) || !localKey.includes(hashId)) {
					if (localKey.includes('saveData') || localKey.includes('saveResultTrack')) {
						localStorage.removeItem(localKey);
					}
				}
			}
		} catch (ex) {}
	}
	removeSimpleStorageByKey(key: string): void {
		try {
			for (let localKey in localStorage) {
				if (localKey.includes(key)) {
					localStorage.removeItem(localKey);
				}
			}
		} catch (ex) {}
	}
	getSessionStorageSize(): number {
		//Use this.getSizeFullLocalStorage() >= 4500 (total Byte)
		try {
			let _lsTotal = 0;
			let _xLen;
			let _x;
			for (_x in sessionStorage) {
				if (!sessionStorage.hasOwnProperty(_x)) {
					continue;
				}
				_xLen = (sessionStorage[_x].length + _x.length) * 2;
				_lsTotal += _xLen;
			}

			return _lsTotal / 1024;
		} catch (error) {
			return 0;
		}
	}

	// SessionStore utils
	saveSimpleSessionStorage(key: string, value: string): void {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return;
			key = userObj.id + '_' + key;
			sessionStorage.setItem(key, value);
		} catch (ex) {}
	}
	getSimpleSessionStorage(key: string): string | undefined {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return undefined;
			key = userObj.id + '_' + key;
			let localValue = sessionStorage.getItem(key);
			if (localValue != null) {
				return localValue;
			} else {
				return undefined;
			}
		} catch (ex) {}
		return undefined;
	}
	clearSimpleSessionStorage(): void {
		try {
			sessionStorage.clear();
		} catch (ex) {}
	}
	removeSimpleSessionStorage(key: string): void {
		try {
			let userObj = this.getUserObj();
			if (!userObj) return;
			key = userObj.id + '_' + key;
			sessionStorage.removeItem(key);
		} catch (ex) {}
	}
	//Get user info
	getUserObj(): User | undefined {
		//Get from local storage by user_obj
		try {
			let obj = this.getStorage('user_obj');
			let userObj = obj ? this.myParseJson<User>(obj) : null;
			if (userObj) {
				return userObj;
			}
		} catch (ex) {}
		
		return undefined;
	}
	parseJwt(token: string): any | undefined {
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join(''),
		);
		return this.myParseJson<any>(jsonPayload);
	}

	myParseJson<T>(data: string): T | undefined {
		try {
			return data ? (JSON.parse(data) as T) : undefined;
		} catch (ex) {
			return undefined;
		}
	}

	//Check ios device
	iOS(): boolean {
		return (
			['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
			// iPad on iOS 13 detection
			(navigator.userAgent.includes('Mac') && 'ontouchend' in document)
		);
	}
	private parseUserTokenData: Record<string, any> = {};
}
