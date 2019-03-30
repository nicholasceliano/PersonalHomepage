import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { OAuthService } from './utility/oauth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService extends OAuthService {

  constructor(private http: HttpClient,
              private cookie: CookieService) {
                super(http, cookie);
              }

  GetUserAuthUID(): string {
    return this.cookie.get(environment.oauthCookiesName.google);
  }

  GetOAuth2SignInUrl(): Observable<OAuthUrlResponse> {
    return this.http.get<OAuthUrlResponse>(`${environment.oauthEndpoint}/google/getUserOAuth2Url`);
  }
}
