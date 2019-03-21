import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchFollowedStreamsResp } from '../_models/twitch-followed-streams-resp';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TwitchService {

  constructor(private http: HttpClient) { }

  //TODO:Need to move all this to server
  
  getFollowedStreamsByUserId(): Observable<TwitchFollowedStreamsResp> {
    var url = `${environment.twitchAPIv5Uri}/streams/followed?limit=100`;

    var httpOptions = { 
      headers: new HttpHeaders ({
        "Client-ID": environment.twitchClientId,
        "Accept": "application/vnd.twitchtv.v5+json"
      })
    };

    return this.http.get<TwitchFollowedStreamsResp>(url, httpOptions);
  }

  authenticate(): void {
    var respType = "token";
    var scopes = "";
    var url = `${environment.twitchAuthUri}/authorize?client_id=${environment.twitchClientId}&redirect_uri=${environment.twitchRedirectUri}&response_type=${respType}&scope=${scopes}`;

    window.location.href = url;
  }

  revokeAuthentication(token): void {
    var url = `${environment.twitchAuthUri}/revoke?client_id=${environment.twitchClientId}&token=${token}`;

    this.http.post(url, "").subscribe(res => console.log(res), (err) => console.log(err));
  }
}