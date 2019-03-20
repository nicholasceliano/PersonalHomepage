import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthUrlResponse } from '../_models/oauth-url-response';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  GetOAuth2SignInUrl(): Observable<OAuthUrlResponse> {
    return this.http.get<OAuthUrlResponse>("http://localhost:3000/google/getUserOAuth2Url");
  }
}