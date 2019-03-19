import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchFollowedStreamsResp } from '../_models/twitch-followed-streams-resp';

@Injectable({
  providedIn: 'root'
})

export class TwitchService {

  constructor(private http: HttpClient) { }

  private twitchAuthUri = "https://id.twitch.tv/oauth2";
  private twitchAPIv5Uri = "https://api.twitch.tv/kraken";
  private clientId = "x15tbpitfdkjhoiotp5mdivv7ukq5n";//TODO: need to break this out somehow
  private redirectUri = "http://localhost:4200/twitchAuth";

  getFollowedStreamsByUserId(): Observable<TwitchFollowedStreamsResp> {
    var url = `${this.twitchAPIv5Uri}/streams/followed?limit=100`;

    var httpOptions = { 
      headers: new HttpHeaders ({
        "Client-ID": this.clientId,
        "Accept": "application/vnd.twitchtv.v5+json"
      })
    };

    return this.http.get<TwitchFollowedStreamsResp>(url, httpOptions);
  }

  authenticate(): void {
    var respType = "token";
    var scopes = "";
    var url = `${this.twitchAuthUri}/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=${respType}&scope=${scopes}`;

    window.location.href = url;
  }

  revokeAuthentication(token): void {
    var url = `${this.twitchAuthUri}/revoke?client_id=${this.clientId}&token=${token}`;

    this.http.post(url, "").subscribe(res => console.log(res), (err) => console.log(err));
  }
}