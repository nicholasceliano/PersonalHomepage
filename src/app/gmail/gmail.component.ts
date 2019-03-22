import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { GmailThread } from '../_models/gmail-thread';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private googleService: GoogleService) { }

  public isPanelLoaded: boolean = false;
  public signInUrl: string;
  public googleAuthenicated: boolean = false;
  public unreadThreads: GmailThread[] = [];

  ngOnInit() {
    var googleUserAuthUID = this.googleService.GetUserAuthUID();
    
    if (googleUserAuthUID && googleUserAuthUID.length == 36) {
      this.googleService.GetUnreadEmails().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
        if (res.err) {
          this.failedAuthentication(res.msg);
        } else {
          this.googleAuthenicated = true;
          this.unreadThreads = res.data;
        }
      }, (err) => {
        this.failedAuthentication(err);
      });
    } else {
      this.failedAuthentication();
    }
  }

  authenticate() {
    window.location.href = this.signInUrl;
  }

  private failedAuthentication(err?: string) {
    this.googleAuthenicated = false;
    this.googleService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
      this.signInUrl = res.url;
    });

    if (err) {
      console.log(err);
    }
  }
}