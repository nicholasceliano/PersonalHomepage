import { Component, OnInit } from '@angular/core';
import { TwitchService } from '../_services/twitch.service';
import { TwitchStream } from '../_models/twitch-stream';
import { finalize } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { TwitchChatService } from '../_services/twitch-chat.service';
import { TwitchChatMessage } from '../_models/twitch-chat-message';
import { TwitchChatMessageText } from '../_models/twitch-chat-message-text';
import { TwitchUser } from '../_models/twitch-user';
declare var $: any;

@Component({
	selector: 'app-twitch',
	templateUrl: './twitch.component.html',
	styleUrls: ['./twitch.component.css']
})

export class TwitchComponent implements OnInit {

	constructor(
		private twitchService: TwitchService,
		private twitchChatService: TwitchChatService) { }

	private pollSubscription: Subscription;
	private twitchChatOverlay = '#twitchChatVideoOverlay';
	private twitchPlayerElement = '#twitch-player';
	private twitchPanelTabs = '#twitchTabs';
	private twitchPlayer;
	private twitchPlayerWidth = 400;
	private twitchPlayerHeight = 300;
	private twitchUserInfo: TwitchUser;
	public chatMsgs: TwitchChatMessage[] = [];
	public isPanelLoaded = false;
	public signInUrl: string;
	public twitchAuthenticated = false;
	public followedStreams: TwitchStream[];
	public channelSelected = false;
	public showChatTab = false;
	public streamTitle: string;
	public streamChannel: string;
	public streamGame: string;
	public emoteUrl = (id) => `http://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`;

	ngOnInit() {
		this.pollSubscription = timer(0, environment.twitchPanelRefreshTime).subscribe(() => this.refreshTwitchPanel());
		this.loadTwitchPlayerScript();
	}

	authenticate() {
		window.location.href = this.signInUrl;
	}

	private loadTwitchPlayerScript() {
		const tag = document.createElement('script');
		tag.src = environment.twitchPlayerAPIEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	private refreshTwitchPanel() {
		const twitchUserAuthUID = this.twitchService.GetUserAuthUID();

		if (twitchUserAuthUID && twitchUserAuthUID.length === 36) {
			this.twitchService.GetFollowedStreams().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				this.twitchAuthenticated = true;

				if (JSON.stringify(this.followedStreams) !== JSON.stringify(res)) {
					this.followedStreams = res;
				}
			});

			if (!this.twitchUserInfo) {
				this.twitchService.GetTwitchUserInfo().subscribe((res) => {
					this.twitchUserInfo = res;
				});
			}
		} else {
			this.failedAuthentication();
		}
	}

	private failedAuthentication() {
		this.twitchAuthenticated = false;
		this.followedStreams = [];
		this.twitchService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}

	public showStream(followedStream: TwitchStream) {
		this.channelSelected = true;
		this.showChatTab = true;
		this.streamTitle = followedStream.channelStatus;
		this.streamChannel = followedStream.channelDisplayName;
		this.streamGame = followedStream.game;
		$(this.twitchPlayerElement).empty();
		this.twitchPlayer = new (window as any).Twitch.Player('twitch-player', {
			width: this.twitchPlayerWidth,
			height: this.twitchPlayerHeight,
			channel: followedStream.channelName,
			allowfullscreen: false,
		});
		this.loadChat(followedStream.channelName);
	}

	public clickChannelsTab() {
		this.showChatTab = false;
	}

	public loadChat(channelName: string) {
		this.chatMsgs = [];
		this.chatMsgs.push({ color: '', username: this.streamChannel, msg: [{
			text: 'Joining my Channel :D', isEmote: false } as TwitchChatMessageText]
		} as TwitchChatMessage);
		this.twitchChatService.loadTwitchChat(channelName, this.twitchUserInfo.name, this.twitchUserInfo.token, this.setChatMessage.bind(this));
	}

	public setChatMessage(chatMsg: TwitchChatMessage) {
		if (this.chatMsgs.length > 75) {
			this.chatMsgs.pop();
		}
		this.chatMsgs.unshift(chatMsg);
	}

	public showTwitchFullscreen() {
		document.onfullscreenchange = () => {
			if (!(window as any).document.fullscreenElement) {
				$(this.twitchChatOverlay).hide();
				$('body').removeClass('overflow-hidden');

				$(this.twitchPanelTabs).show();
				$(this.twitchPlayerElement).removeClass('fixed-top');

				this.twitchPlayer.setWidth(this.twitchPlayerWidth);
				this.twitchPlayer.setHeight(this.twitchPlayerHeight);
			}
		};

		document.documentElement.requestFullscreen().then (() => {
			$(this.twitchChatOverlay).show();
			$('body').addClass('overflow-hidden');

			$(this.twitchPanelTabs).hide();
			$(this.twitchPlayerElement).addClass('fixed-top');

			this.twitchPlayer.setWidth($(window).width());
			this.twitchPlayer.setHeight($(window).height());

			window.scrollTo(0, 0);
		});
	}
}
