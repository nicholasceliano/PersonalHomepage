import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  GetUserAuthUID(): string {
    return this.cookie.get("googleAuthUID");
  }

  private SetGoogleApiHeaders() {
    return {
      headers: new HttpHeaders({
        'UserAuthUID':  this.GetUserAuthUID()
      })
    };
  }

  GetOAuth2SignInUrl(): Observable<OAuthUrlResponse> {
    return this.http.get<OAuthUrlResponse>("http://localhost:3000/oauth/google/getUserOAuth2Url");
  }

  GetGmailData(): Observable<object> {
    return this.http.get<object>("http://localhost:3000/api/gmail/getLabels", this.SetGoogleApiHeaders())
  }
}