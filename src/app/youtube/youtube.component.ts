import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../_services/youtube.service';
import { YoutubePlaylistItem } from '../_models/youtube-playlist-item';
import { environment } from 'src/environments/environment';
import $ from 'jquery';
import { AlertsService } from '../_services/alerts.service';
import { FullOrderedArrayAlertCountStrategy } from '../_logic/AlertCountStrategy/full-ordered-array';
import { VideoPlayerPanel } from '../_logic/panel/video-player-panel';

@Component({
	selector: 'app-youtube',
	templateUrl: './youtube.component.html',
	styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent extends VideoPlayerPanel implements OnInit {

	constructor(
		private youtubeService: YoutubeService,
		private alertsService: AlertsService) {
		super('#youtube-player', 400, 225, environment.defaultRefreshTime);
	}

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

	protected refreshPanel() {
		this.getSubscriptionVideos();
	}

	protected closeFullscreenVideo() {
		this.youtubePlayer.setSize(this.videoPlayerWidth, this.videoPlayerHeight);
	}

	protected openFullscreenVideo() {
		this.youtubePlayer.setSize($(window).width(), $(window).height());
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

	private getSubscriptionVideos(): void {
		this.youtubeService.getSubscriptionVideos().subscribe((res) => {
			this.subscriptionVideos = this.alertsService.checkAlerts('Youtube Video', new FullOrderedArrayAlertCountStrategy(),
																this.subscriptionVideos, res, this.isPanelLoaded);
			this.isPanelLoaded = true;
		});
	}
}
