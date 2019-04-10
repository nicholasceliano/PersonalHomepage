import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../_services/youtube.service';
import { YoutubePlaylistItem } from '../_models/youtube-playlist-item';
import { environment } from 'src/environments/environment';
import { VideoPlayerService } from '../_services/video-player.service';
import $ from 'jquery';

@Component({
	selector: 'app-youtube',
	templateUrl: './youtube.component.html',
	styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent extends VideoPlayerService implements OnInit {

	constructor(private youtubeService: YoutubeService) {
		super();
	}

	public isPanelLoaded = false;
	public selectedVideo: string;
	public subscriptionVideos: YoutubePlaylistItem[];
	public videoTitle: string;
	private youtubePlayer: any;
	private youtubePlayerElement = '#youtube-player';

	ngOnInit() {
		this.loadVideoPlayerScript(environment.youtubePlayerAPIEndpoint);
		this.getSubscriptionVideos();
	}

	watchVideo(videoItem: YoutubePlaylistItem) {
		this.selectedVideo = videoItem.videoId;
		this.videoTitle = videoItem.videoTitle;
		this.loadYoutubeVideo(videoItem.videoId);
	}

	closeVideo() {
		this.selectedVideo = '';
		this.videoTitle = '';
		$(this.youtubePlayerElement).hide();
		this.youtubePlayer.stopVideo();
	}

	private loadYoutubeVideo(vidId: string) {
		if (this.youtubePlayer) {
			this.youtubePlayer.loadVideoById({ videoId: vidId });
		} else {
			this.youtubePlayer = new (window as any).YT.Player('youtube-player', {
				height: '225', width: '400',
				videoId: vidId,
				playerVars: { autoplay: 1, modestbranding: 1 },
				events: { onReady: (e) => e.target.playVideo(),
					onStateChange: (e) => (e.data === 3 ? $(this.youtubePlayerElement).show() : null) }
			});
		}
	}

	private getSubscriptionVideos(): void {
		this.youtubeService.getSubscriptionVideos().subscribe((res) => {
			this.subscriptionVideos = res;
			this.isPanelLoaded = true;
		});
	}
}
