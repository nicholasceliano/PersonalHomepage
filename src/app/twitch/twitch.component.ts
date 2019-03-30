import { Component, OnInit, Sanitizer } from '@angular/core';
import { TwitchService } from '../_services/twitch.service';
import { TwitchStream } from '../_models/twitch-stream';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OAuthUrlResponse } from '../_models/oauth-url-response';

@Component({
	selector: 'app-twitch',
	templateUrl: './twitch.component.html',
	styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {

	constructor(
		private twitchService: TwitchService,
		private sanitizer: DomSanitizer) { }

	private pollSubscription: Subscription;
	public isPanelLoaded = false;
	public signInUrl: string;
	public isChatLoaded = false;
	public twitchAuthenticated = false;
	public followedStreams: TwitchStream[];
	public streamUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
	public chatUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
	public channelSelected = false;
	public showChatTab = false;
	public streamTitle: string;
	public streamChannel: string;
	public streamGame: string;

	ngOnInit() {
		this.pollSubscription = timer(0, environment.twitchPanelRefreshTime).subscribe(() => this.refreshTwitchPanel());
	}

	authenticate() {
		window.location.href = this.signInUrl;
	}

	private refreshTwitchPanel() {
		const twitchUserAuthUID = this.twitchService.GetUserAuthUID();

		if (twitchUserAuthUID && twitchUserAuthUID.length === 36) {
			this.twitchService.GetFollowedStreams().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				if (res.err) {
					this.failedAuthentication(res.msg);
				} else {
					this.twitchAuthenticated = true;

					if (JSON.stringify(this.followedStreams) !== JSON.stringify(res.data)) {
						this.followedStreams = res.data;
					}
				}
			}, (err) => {
				this.failedAuthentication(err);
			});
		} else {
			this.failedAuthentication();
		}
	}

	private failedAuthentication(err?: string) {
		this.twitchAuthenticated = false;
		this.followedStreams = [];
		this.twitchService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}

	public showStream(followedStream: TwitchStream) {
		this.channelSelected = true;
		this.showChatTab = true;
		this.isChatLoaded = false;
		this.streamTitle = followedStream.channelStatus;
		this.streamChannel = followedStream.channelDisplayName;
		this.streamGame = followedStream.game;
		this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.twitch.tv/?channel=${followedStream.channelName}` +
			`&muted=false`);
		this.chatUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/embed/${followedStream.channelName}` +
			`/chat?darkpopout`);
	}

	public clickChannelsTab() {
		this.showChatTab = false;
	}

	public loadedChat() {
		this.isChatLoaded = true;
	}
}
