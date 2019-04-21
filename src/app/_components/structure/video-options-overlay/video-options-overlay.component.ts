import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-video-options-overlay',
	templateUrl: './video-options-overlay.component.html',
	styleUrls: ['./video-options-overlay.component.css']
})
export class VideoOptionsOverlayComponent implements OnInit {
	@Input() isFullscreen: boolean;
	@Input() cpColor?: string;
	@Output() cpColorChange?: EventEmitter<string> = new EventEmitter();
	@Output() widescreen: EventEmitter<any> = new EventEmitter();
	@Output() fullscreen: EventEmitter<any> = new EventEmitter();
	@Output() normalscreen: EventEmitter<any> = new EventEmitter();

	constructor() { }

	public enableColorPicker = false;
	public cpToggle = false;

	ngOnInit() {
		if (this.cpColor !== undefined) {
			this.enableColorPicker = true;
		}
	}

	changeCpColor(value: string) {
		this.cpColorChange.emit(value);
	}

	widescreenVideo() {
		this.widescreen.emit();
	}

	fullscreenVideo() {
		this.fullscreen.emit();
	}

	normalscreenVideo() {
		this.normalscreen.emit();
	}
}
