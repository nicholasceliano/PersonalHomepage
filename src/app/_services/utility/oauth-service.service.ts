import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from 'src/app/_models/oauth-url-response';

@Injectable({
  providedIn: 'root'
})
export abstract class OAuthService {
  private parentCookie: CookieService;
  private parentHttp: HttpClient;

  constructor(private _http: HttpClient,
              private _cookie: CookieService) {
                this.parentCookie = _cookie;
                this.parentHttp = _http;
              }

  public abstract GetUserAuthUID(): string;
  public abstract GetOAuth2SignInUrl(): Observable<OAuthUrlResponse>;

  SetApiHeaders() {
    return {
      headers: new HttpHeaders({
        UserAuthUID:  this.GetUserAuthUID()
      })
    };
  }
}
