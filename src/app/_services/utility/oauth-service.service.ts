import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from 'src/app/_models/oauth-url-response';

@Injectable({
	providedIn: 'root'
})
export abstract class OAuthService {
	constructor() {}

	public abstract GetUserAuthUID(): string;
	public abstract GetOAuth2SignInUrl(): Observable<OAuthUrlResponse>;

	SetApiHeaders() {
		return {
			withCredentails: true,
			headers: new HttpHeaders({
				UserAuthUID: this.GetUserAuthUID()
			})
		};
	}
}
