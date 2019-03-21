import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  GetUserAuthUID(): string {
    return this.cookie.get(environment.oauthCookiesName.google);
  }

  private SetGoogleApiHeaders() {
    return {
      headers: new HttpHeaders({
        'UserAuthUID':  this.GetUserAuthUID()
      })
    };
  }

  GetOAuth2SignInUrl(): Observable<OAuthUrlResponse> {
    return this.http.get<OAuthUrlResponse>(`${environment.oauthEndpoint}/google/getUserOAuth2Url`);
  }

  GetGmailData(): Observable<object> {
    return this.http.get<object>(`${environment.apiEndpoint}/gmail/getLabels`, this.SetGoogleApiHeaders())
  }
}