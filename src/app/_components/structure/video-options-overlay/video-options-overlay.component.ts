import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-video-options-overlay',
	templateUrl: './video-options-overlay.component.html',
	styleUrls: ['./video-options-overlay.component.css']
})
export class VideoOptionsOverlayComponent implements OnInit {
	@Input() isFullscreen: boolean;
	@Input() cpToggle?: boolean;
	@Output() cpToggleChange?: EventEmitter<boolean> = new EventEmitter();
	@Output() widescreen: EventEmitter<any> = new EventEmitter();
	@Output() fullscreen: EventEmitter<any> = new EventEmitter();
	@Output() normalscreen: EventEmitter<any> = new EventEmitter();

	constructor() { }

	public enableColorPicker = false;

	ngOnInit() {
		if (this.cpToggle !== undefined) {
			this.enableColorPicker = true;
		}
	}

	toggleCp(value: boolean) {
		this.cpToggleChange.emit(value);
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
