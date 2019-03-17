import { Component, OnInit, Sanitizer } from '@angular/core';
import { TwitchService } from '../_services/twitch.service';
import { TwitchStream } from '../_models/twitch-stream';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {

  constructor(private twitch: TwitchService,
    private sanitizer: DomSanitizer) { }

  public followedStreams: TwitchStream[];
  public streamUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://player.twitch.tv/?channel=summit1g&muted=true");

  ngOnInit() {
    this.twitch.getFollowedStreamsByUserId().subscribe(res => this.followedStreams = res.streams);
  }

  public authenticate() {
    this.twitch.authenticate();
  }

  public revokeTwitchAuthentication() {
    this.twitch.revokeAuthentication();
  }

  public showStream(channelName) {
    this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://player.twitch.tv/?channel=" + channelName + "&muted=false");
  }
}
