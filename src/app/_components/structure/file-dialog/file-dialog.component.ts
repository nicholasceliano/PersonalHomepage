import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import $ from 'jquery';
import { KeyMapsService } from '../../../_services/utility/key-maps.service';

@Component({
	selector: 'app-file-dialog',
	templateUrl: './file-dialog.component.html',
	styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {

	public title: string;
	public titleTooltip: string;
	public content: string;
	public isFullScreen = false;
	private matDialogContentElement = '.mat-dialog-content';
	private initialScrollSpeed = 250;
	private scrollSpeed = 250;
	private scrollSpeedInterval = 31.25;
	private jumpScrollSpeed = 200;
	private scrollingInterval;
	public scrollMultiplier = () => this.initialScrollSpeed / this.scrollSpeed;
	public toggleBtnText = () => this.scrollingInterval ? 'Stop' : 'Start';

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<FileDialogComponent>,
		private keyMapService: KeyMapsService) {
		this.title = data.title;
		this.titleTooltip = data.titleTooltip;
		this.content = data.content;

		this.dialogRef.afterClosed().subscribe((r) => {
			this.stopScrolling();
			this.keyMapService.keys.Escape = false; // Key up event bugged when Mat Dialog is closed with a key press
		});
	}

	ngOnInit() { }

	toggleScroll() {
		this.scrollingInterval ? this.stopScrolling() : this.startScroll();
	}

	increaseScrollSpeed() {
		if (this.scrollSpeed > 0) {
			this.scrollSpeed = this.scrollSpeed - this.scrollSpeedInterval;
			this.updateScrollingSpeed();
		}
	}

	decreaseScrollSpeed() {
		if (this.scrollSpeed < this.initialScrollSpeed) {
			this.scrollSpeed = this.scrollSpeed + this.scrollSpeedInterval;
			this.updateScrollingSpeed();
		}
	}

	closeDialog() {
		this.dialogRef.close();
	}

	fullScreenDialog() {
		document.onfullscreenchange = () => {
			if (!(window as any).document.fullscreenElement) {
				this.isFullScreen = false;
			}
		};

		document.documentElement.requestFullscreen().then (() => {
			this.isFullScreen = true;

			window.scrollTo(0, 0);
		});
	}

	exitFullScreenDialog() {
		document.exitFullscreen();
		this.isFullScreen = false;
	}

	private updateScrollingSpeed() {
		if (this.scrollingInterval) {
			clearInterval(this.scrollingInterval);
			this.scrollingInterval = null;
			this.startScroll();
		}
	}

	private startScroll() {
		this.scrollingInterval = setInterval(() => {
			const current = $(this.matDialogContentElement).scrollTop();
			$(this.matDialogContentElement).scrollTop(1 + current);
		}, this.scrollSpeed);
	}

	private stopScrolling() {
		clearInterval(this.scrollingInterval);
		this.scrollingInterval = null;
	}

	private resetScolling() {
		this.stopScrolling();
		this.scrollSpeed = this.initialScrollSpeed;
	}

	private jumpScrollDown() {
		const current = $(this.matDialogContentElement).scrollTop();
		$(this.matDialogContentElement).scrollTop(this.jumpScrollSpeed + current);
	}

	private jumpScrollUp() {
		const current = $(this.matDialogContentElement).scrollTop();
		$(this.matDialogContentElement).scrollTop(current - this.jumpScrollSpeed);
	}

	@HostListener('window:keydown', ['$event'])
	keyDownEvent(event: KeyboardEvent) {
		this.keyMapService.keys[event.key] = true;

		if (this.keyMapService.keys.Enter) {
			this.toggleScroll();
		} else if (this.keyMapService.keys['-']) {
			this.decreaseScrollSpeed();
		} else if (this.keyMapService.keys['=']) {
			this.increaseScrollSpeed();
		} else if (this.keyMapService.keys.Backspace) {
			this.resetScolling();
		} else if (this.keyMapService.keys.Escape) {
			this.closeDialog();
		} else if (this.keyMapService.keys[' '] && !this.keyMapService.keys.Shift) {
			this.jumpScrollDown();
		} else if (this.keyMapService.keys[' '] && this.keyMapService.keys.Shift) {
			this.jumpScrollUp();
		}
	}
}
