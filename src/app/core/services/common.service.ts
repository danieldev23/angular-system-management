import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommonService {
    constructor() { }
    base64ObjHeader(data: string): string {
        return btoa(data);
    }
    jsonParse<T>(json: string): T | undefined {
        try {
            return JSON.parse(json) as T;
        } catch (error) {
            return undefined;
        }
    }
}