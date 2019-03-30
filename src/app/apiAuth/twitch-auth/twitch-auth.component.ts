import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-twitch-auth',
  templateUrl: './twitch-auth.component.html',
  styleUrls: ['./twitch-auth.component.css']
})
export class TwitchAuthComponent implements OnInit {

  private twitchAuthUID: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cookie: CookieService) {
              this.route.queryParamMap.subscribe(params => {
                this.twitchAuthUID = params.get('uid');
              });
            }

  ngOnInit() {
    this.cookie.set(environment.oauthCookiesName.twitch, this.twitchAuthUID);
    this.router.navigate(['/']);
  }
}
