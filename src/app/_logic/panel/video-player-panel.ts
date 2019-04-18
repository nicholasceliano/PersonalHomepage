import $ from 'jquery';
import { RefreshPanel } from './refresh-panel';
import { HostListener } from '@angular/core';

export abstract class VideoPlayerPanel extends RefreshPanel {

	protected videoPlayerElemetId: string;
	protected videoPlayerWidth: number;
	protected videoPlayerHeight: number;

	constructor(elementId: string, width: number, height: number, refreshTime: number) {
		super(refreshTime);
		this.videoPlayerElemetId = elementId;
		this.videoPlayerWidth = width;
		this.videoPlayerHeight = height;
	}

	public isFullscreen = false;
	public abstract watchVideo(videData: any);
	public abstract closeVideo();
	protected isVideoExpanded = false;
	protected abstract expandVideoSize();
	protected abstract reduceVideoSize();

	public fullscreenVideo() {
		document.onfullscreenchange = () => {
			if (!(window as any).document.fullscreenElement && this.isFullscreen) {
				this.reduceVideo();
				this.isFullscreen = false;
			}
		};

		document.documentElement.requestFullscreen().then (() => {
			this.isFullscreen = true;
			this.expandVideo();
		});
	}

	public widescreenVideo() {
		this.isFullscreen = false;
		if ((window as any).document.fullscreenElement) {
			document.exitFullscreen().then(() => this.expandVideo());
		} else {
			this.expandVideo();
		}
	}

	public reduceVideo() {
		this.isVideoExpanded = false;
		if ((window as any).document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			$('body').removeClass('overflow-hidden');
			$(this.videoPlayerElemetId).removeClass('fixed-top');
			this.reduceVideoSize();
			this.isFullscreen = false;
		}
	}

	protected expandVideo() {
		this.isVideoExpanded = true;
		$('body').addClass('overflow-hidden');
		$(this.videoPlayerElemetId).addClass('fixed-top');
		window.scrollTo(0, 0);
		this.expandVideoSize();
	}

	protected loadVideoPlayerScript(apiEndpoint: string) {
		const tag = document.createElement('script');
		tag.src = apiEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	@HostListener('window:resize')
	onResize() {
		if (this.isVideoExpanded) {
			this.expandVideoSize();
		}
	}
}
