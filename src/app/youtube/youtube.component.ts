import { Component, OnInit } from '@angular/core';

import { YoutubeService } from '../_services/youtube.service';
import { YoutubePlaylistItem } from '../_models/youtube-playlist-item';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-youtube',
	templateUrl: './youtube.component.html',
	styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

	constructor(private youtubeService: YoutubeService) { }

	public isPanelLoaded = false;
	public selectedVideo: string;
	public subscriptionVideos: YoutubePlaylistItem[];
	private player: any;

	ngOnInit() {
		this.loadYoutubePlayerScript();
		this.getSubscriptionVideos();
	}

	watchVideo(videoId: string) {
		this.selectedVideo = videoId;
		this.loadYoutubeVideo(videoId);
	}

	private loadYoutubePlayerScript() {
		const tag = document.createElement('script');
		tag.src = environment.youtubePlayerAPIEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	private loadYoutubeVideo(vidId: string) {
		if (this.player) {
			this.player.loadVideoById({ videoId: vidId });
		} else {
			this.player = new (window as any).YT.Player('youtube-player', {
				height: '225', width: '400',
				videoId: vidId,
				playerVars: { autoplay: 1, modestbranding: 1 },
				events: { onReady: (e) => e.target.playVideo() }
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
