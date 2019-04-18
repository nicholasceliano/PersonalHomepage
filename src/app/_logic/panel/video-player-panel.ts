import $ from 'jquery';
import { RefreshPanel } from './refresh-panel';

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

	public abstract watchVideo(videData: any);
	public abstract closeVideo();
	protected abstract expandVideoSize();
	protected abstract reduceVideoSize();

	public fullscreenVideo() {
		document.onfullscreenchange = () => {
			if (!(window as any).document.fullscreenElement) {
				this.reduceVideo();
			}
		};

		document.documentElement.requestFullscreen().then (() => {
			this.expandVideo();
			window.scrollTo(0, 0);
		});
	}

	public widescreenVideo() {
		this.expandVideo();
	}

	public reduceVideo() {
		if ((window as any).document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			$('body').removeClass('overflow-hidden');
			$(this.videoPlayerElemetId).removeClass('fixed-top');
			this.reduceVideoSize();
		}
	}

	protected expandVideo() {
		$('body').addClass('overflow-hidden');
		$(this.videoPlayerElemetId).addClass('fixed-top');
		this.expandVideoSize();
	}

	protected loadVideoPlayerScript(apiEndpoint: string) {
		const tag = document.createElement('script');
		tag.src = apiEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}
