import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { CookieService } from 'ngx-cookie-service';
import { APIResponse } from '../_models/apiresponse';
import { TwitchStream } from '../_models/twitch-stream';
import { OAuthService } from './utility/oauth-service.service';
import { TwitchUser } from '../_models/twitch-user';

@Injectable({
	providedIn: 'root'
})

export class TwitchService extends OAuthService {

	constructor(
		private http: HttpClient,
		private cookie: CookieService) {
		super(http, cookie);
	}

	GetUserAuthUID(): string {
		return this.cookie.get(environment.oauthCookiesName.twitch);
	}

	GetOAuth2SignInUrl(): Observable<OAuthUrlResponse> {
		return this.http.get<OAuthUrlResponse>(`${environment.oauthEndpoint}/twitch/getUserOAuth2Url`);
	}

	GetFollowedStreams(): Observable<APIResponse<TwitchStream[]>> {
		return this.http.get<APIResponse<TwitchStream[]>>(`${environment.apiEndpoint}/twitch/followedStreams`, this.SetApiHeaders());
	}

	GetTwitchUserInfo(): Observable<APIResponse<TwitchUser>> {
		return this.http.get<APIResponse<TwitchUser>>(`${environment.apiEndpoint}/twitch/userInfo`, this.SetApiHeaders());
	}
}
