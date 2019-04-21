import { Component, OnInit } from '@angular/core';
import { TwitchService } from '../../_services/twitch.service';
import { TwitchStream } from '../../_models/twitch-stream';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OAuthUrlResponse } from '../../_models/oauth-url-response';
import { TwitchChatService } from '../../_services/provider/twitch-chat.service';
import { TwitchChatMessage } from '../../_models/twitch-chat-message';
import { TwitchChatMessageText } from '../../_models/twitch-chat-message-text';
import { TwitchUser } from '../../_models/twitch-user';
import { AlertsService } from '../../_services/alerts.service';
import { RandomChangingArrayAlertCountStrategy } from '../../_logic/AlertCountStrategy/random-changing-array';
import { OAuthVideoPlayerPanel } from 'src/app/_logic/panel/oauth-video-player-panel';
import $ from 'jquery';

@Component({
	selector: 'app-twitch',
	templateUrl: './twitch.component.html',
	styleUrls: ['./twitch.component.css']
})

export class TwitchComponent extends OAuthVideoPlayerPanel implements OnInit {

	constructor(
		private twitchService: TwitchService,
		private twitchChatService: TwitchChatService,
		private alertsService: AlertsService) {
			super('#twitch-player', 400, 300, environment.twitchPanelRefreshTime);
		}

	private twitchChatOverlay = '#twitchChatVideoOverlay';
	private twitchPanelTabs = '#twitchTabs';
	private twitchPlayer;
	public chatMsgs: TwitchChatMessage[] = [];
	public followedStreams: TwitchStream[];
	public channelSelected = false;
	public showChatTab = false;
	public streamTitle: string;
	public streamChannel: string;
	public streamGame: string;
	public cpColor = 'rgba(0,0,0,0)';
	public emoteUrl = (id) => `http://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`;

	ngOnInit() {
		this.loadVideoPlayerScript(environment.twitchPlayerAPIEndpoint);
	}

	watchVideo(followedStream: TwitchStream) {
		this.channelSelected = true;
		this.showChatTab = true;
		this.streamTitle = followedStream.channelStatus;
		this.streamChannel = followedStream.channelDisplayName;
		this.streamGame = followedStream.game;
		$(this.videoPlayerElemetId).empty();
		this.twitchPlayer = new (window as any).Twitch.Player('twitch-player', {
			width: this.videoPlayerWidth,
			height: this.videoPlayerHeight,
			channel: followedStream.channelName,
			allowfullscreen: false,
		});
		this.loadChat(followedStream.channelName);
	}

	clickChannelsTab() {
		this.showChatTab = false;
	}

	setChatMessage(chatMsg: TwitchChatMessage) {
		if (this.chatMsgs.length > 75) {
			this.chatMsgs.pop();
		}
		this.chatMsgs.unshift(chatMsg);
	}

	closeVideo() {
		this.channelSelected = false;
		this.showChatTab = false;
		this.streamTitle = undefined;
		this.streamChannel = undefined;
		this.streamGame = undefined;
		$(this.videoPlayerElemetId).empty();

		this.twitchChatService.closeTwitchChat();
		this.chatMsgs = [];
	}

	refreshPanel() {
		const twitchUserAuthUID = this.twitchService.GetUserAuthUID();

		if (twitchUserAuthUID && twitchUserAuthUID.length === 36) {
			this.twitchService.GetFollowedStreams().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				this.panelAuthenticated = true;

				this.followedStreams = this.alertsService.checkAlerts('Twitch Stream', new RandomChangingArrayAlertCountStrategy('channelName'),
																this.followedStreams, res, this.isPanelLoaded);
			});
		} else {
			this.failedAuthentication();
		}
	}

	protected reduceVideoSize() {
		$(this.twitchChatOverlay).hide();
		$(this.twitchPanelTabs).show();

		this.twitchPlayer.setWidth(this.videoPlayerWidth);
		this.twitchPlayer.setHeight(this.videoPlayerHeight);
	}

	protected expandVideoSize() {
		$(this.twitchChatOverlay).show();
		$(this.twitchPanelTabs).hide();

		this.twitchPlayer.setWidth($(window).width());
		this.twitchPlayer.setHeight($(window).height());
	}

	protected failedAuthentication() {
		super.failedAuthentication();
		this.followedStreams = [];
		this.twitchService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}

	private loadChat(channelName: string) {
		this.twitchService.GetTwitchUserInfo().subscribe((res) => {
			const twitchUserInfo: TwitchUser = res;

			this.chatMsgs = [];
			this.chatMsgs.push({ color: '', username: this.streamChannel, msg: [{
				text: 'Joining my Channel :D', isEmote: false } as TwitchChatMessageText]
			} as TwitchChatMessage);
			this.twitchChatService.loadTwitchChat(channelName, twitchUserInfo.name, twitchUserInfo.token, this.setChatMessage.bind(this));
		});
	}
}
