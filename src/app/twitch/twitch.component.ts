import { Component, OnInit, Sanitizer } from '@angular/core';
import { TwitchService } from '../_services/twitch.service';
import { TwitchStream } from '../_models/twitch-stream';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {

  constructor(private twitch: TwitchService,
    private sanitizer: DomSanitizer) { }

  public isPanelLoaded: boolean = false;
  public isChatLoaded: boolean = false;
  public isChannelListLoaded: boolean = false;
  public twitchAuthenticated: boolean = false;
  public followedStreams: TwitchStream[];
  public streamUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
  public chatUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
  public channelSelected: boolean = false;
  public showChatTab: boolean = false;
  public streamTitle: string;
  public streamChannel: string;
  public streamGame: string;

  ngOnInit() {
    this.twitch.getFollowedStreamsByUserId().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
        this.followedStreams = res.streams
        this.twitchAuthenticated = true;
        this.isChannelListLoaded = true;
      }, (err) => { console.log(err); });
  }

  public authenticate() {
    this.twitch.authenticate();
  }

  public showStream(followedStream: TwitchStream) {
    this.channelSelected = true;
    this.showChatTab = true;
    this.isChatLoaded = false;
    this.streamTitle = followedStream.channel.status;
    this.streamChannel = followedStream.channel.display_name;
    this.streamGame = followedStream.game;
    this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${followedStream.channel.name}&muted=false`);
    this.chatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/embed/${followedStream.channel.name}/chat?darkpopout`)
  }
  public clickChannelsTab() {
    this.showChatTab = false;
  }

  public loadedChat() {
    this.isChatLoaded = true;
  }
}
