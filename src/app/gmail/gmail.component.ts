import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { GmailThread } from '../_models/gmail-thread';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private googleService: GoogleService) { }

  public signInUrl: string;
  public loginRequired: boolean = true;
  public unreadThreads: GmailThread[] = [];

  ngOnInit() {
    var googleUserAuthUID = this.googleService.GetUserAuthUID();
    
    if (googleUserAuthUID && googleUserAuthUID.length == 36) {
      this.loginRequired = false;
      this.googleService.GetUnreadEmails().subscribe((res) => {
        this.unreadThreads = res.data;
      });
    } else {
      this.loginRequired = true;
      this.googleService.GetOAuth2SignInUrl().subscribe((res: OAuthUrlResponse) => {
        this.signInUrl = res.url;
      });
    }
  }

  signIn() {
    window.location.href = this.signInUrl;
  }
}