import $ from 'jquery';
import { PanelRefreshService } from './panel-refresh.service';

export abstract class VideoPlayerPanelService extends PanelRefreshService {

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
	protected abstract openFullscreenVideo();
	protected abstract closeFullscreenVideo();

	public fullscreenVideo() {
		document.onfullscreenchange = () => {
			if (!(window as any).document.fullscreenElement) {
				$('body').removeClass('overflow-hidden');
				$(this.videoPlayerElemetId).removeClass('fixed-top');
				this.closeFullscreenVideo();
			}
		};

		document.documentElement.requestFullscreen().then (() => {
			$('body').addClass('overflow-hidden');
			$(this.videoPlayerElemetId).addClass('fixed-top');
			this.openFullscreenVideo();

			window.scrollTo(0, 0);
		});
	}

	protected loadVideoPlayerScript(apiEndpoint: string) {
		const tag = document.createElement('script');
		tag.src = apiEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}
