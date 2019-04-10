import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export abstract class VideoPlayerService {
	abstract watchVideo(videData: any);
	abstract closeVideo();

	protected loadVideoPlayerScript(apiEndpoint: string) {
		const tag = document.createElement('script');
		tag.src = apiEndpoint;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}
