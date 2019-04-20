import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'app-video-options',
	templateUrl: './video-options.component.html',
	styleUrls: ['./video-options.component.css']
})
export class VideoOptionsComponent {
	@Input() videoTitle: string;
	@Output() widescreen: EventEmitter<any> = new EventEmitter();
	@Output() fullscreen: EventEmitter<any> = new EventEmitter();
	@Output() closescreen: EventEmitter<any> = new EventEmitter();

	constructor() { }

	widescreenVideo() {
		this.widescreen.emit();
	}

	fullscreenVideo() {
		this.fullscreen.emit();
	}

	closeVideo() {
		this.closescreen.emit();
	}
}
