import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private googleService: GoogleService) { }
  public signInUrl: string;

  ngOnInit() {
    this.googleService.GetOAuth2SignInUrl().subscribe((res: OAuthUrlResponse) => {
      this.signInUrl = res.url;
    })
  }

  signIn() {
    window.location.href = this.signInUrl;
  }
}