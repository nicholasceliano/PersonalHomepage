import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../_services/youtube.service';
import { YoutubePlaylistItem } from '../../_models/youtube-playlist-item';
import { environment } from 'src/environments/environment';
import $ from 'jquery';
import { AlertsService } from '../../_services/alerts.service';
import { FullOrderedArrayAlertCountStrategy } from '../../_logic/AlertCountStrategy/full-ordered-array';
import { GoogleService } from 'src/app/_services/provider/google.service';
import { finalize } from 'rxjs/operators';
import { OAuthUrlResponse } from 'src/app/_models/oauth-url-response';
import { OAuthVideoPlayerPanel } from 'src/app/_logic/panel/oauth-video-player-panel';

@Component({
	selector: 'app-youtube',
	templateUrl: './youtube.component.html',
	styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent extends OAuthVideoPlayerPanel implements OnInit {

	constructor(
		private youtubeService: YoutubeService,
		private googleService: GoogleService,
		private alertsService: AlertsService) {
		super('#youtube-player', 400, 225, environment.defaultRefreshTime);
	}

	private youtubeOverlay = '#youtubeOverlay';
	public isPanelLoaded = false;
	public selectedVideo: string;
	public subscriptionVideos: YoutubePlaylistItem[];
	public videoTitle: string;
	private youtubePlayer: any;

	ngOnInit() {
		this.loadVideoPlayerScript(environment.youtubePlayerAPIEndpoint);
	}

	watchVideo(videoItem: YoutubePlaylistItem) {
		this.selectedVideo = videoItem.videoId;
		this.videoTitle = videoItem.videoTitle;
		this.loadYoutubeVideo(videoItem.videoId);
	}

	closeVideo() {
		this.selectedVideo = undefined;
		this.videoTitle = undefined;
		$(this.videoPlayerElemetId).hide();
		this.youtubePlayer.stopVideo();
	}

	protected reduceVideoSize() {
		$(this.youtubeOverlay).hide();

		this.youtubePlayer.setSize(this.videoPlayerWidth, this.videoPlayerHeight);
	}

	protected expandVideoSize() {
		$(this.youtubeOverlay).show();

		this.youtubePlayer.setSize($(window).width(), $(window).height());
	}

	protected refreshPanel(): void {
		const googleUserAuthUID = this.googleService.GetUserAuthUID();

		if (this.googleService.isValidAuthUID(googleUserAuthUID)) {
			this.youtubeService.getSubscriptionVideos().subscribe((res) => {
				this.panelAuthenticated = true;
				this.subscriptionVideos = this.alertsService.checkAlerts('Youtube Video', new FullOrderedArrayAlertCountStrategy(),
					this.subscriptionVideos, res, this.isPanelLoaded);
				this.isPanelLoaded = true;
			});
		} else {
			this.failedAuthentication();
		}
	}

	protected failedAuthentication() {
		super.failedAuthentication();
		this.subscriptionVideos = [];
		this.googleService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}

	private loadYoutubeVideo(vidId: string) {
		if (this.youtubePlayer) {
			this.youtubePlayer.loadVideoById({ videoId: vidId });
		} else {
			this.youtubePlayer = new (window as any).YT.Player('youtube-player', {
				height: this.videoPlayerHeight,
				width: this.videoPlayerWidth,
				videoId: vidId,
				playerVars: { autoplay: 1, modestbranding: 1, fs: 0 },
				events: { onReady: (e) => e.target.playVideo(),
						onStateChange: (e) => (e.data === 3 ? $(this.videoPlayerElemetId).show() : null) }
			});
		}
	}
}
