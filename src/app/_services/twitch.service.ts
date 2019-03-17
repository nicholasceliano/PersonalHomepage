import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TwitchFollowedStreamsResp } from '../_models/twitch-followed-streams-resp';


@Injectable({
  providedIn: 'root'
})

export class TwitchService {

  constructor(private http: HttpClient) { }

  getFollowedStreamsByUserId(): Observable<TwitchFollowedStreamsResp> {
    var url = `https://api.twitch.tv/kraken/streams/followed?limit=100`;

    var httpOptions = { 
      headers: new HttpHeaders ({
        "Client-ID": this.getClientId(),
        "Accept": "application/vnd.twitchtv.v5+json"
      })
    }

    return this.http.get<TwitchFollowedStreamsResp>(url, httpOptions);
  }

  authenticate(): void {
    var clientId = this.getClientId();
    var redirectUri = "http://localhost:3333/twitchAuth";
    var respType = "code";
    var scopes = "channel:read:subscriptions";
    
    var url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${respType}&scope=${scopes}`;

    window.location.replace(url);
  }

  revokeAuthentication(): void {
    var clientId = this.getClientId();
    var token = "7a933w1wif8u2ggyy446dihrgtew52";
    
    var url = `https://id.twitch.tv/oauth2/revoke?client_id=${clientId}&token=${token}`;

    this.http.post(url, "").subscribe(res => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  }

  private getClientId(): string {
    return "x15tbpitfdkjhoiotp5mdivv7ukq5n";
  }
}