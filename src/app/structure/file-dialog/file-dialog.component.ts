import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import $ from 'jquery';

@Component({
	selector: 'app-file-dialog',
	templateUrl: './file-dialog.component.html',
	styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {

	public title: string;
	public titleTooltip: string;
	public content: string;
	private matDialogContentElement = '.mat-dialog-content';
	private initialScrollSpeed = 300;
	private scrollSpeed = 300;
	private scrollSpeedInterval = 10;
	private scrollingInterval;
	public scrollMultiplier = () => this.initialScrollSpeed / this.scrollSpeed;
	public toggleBtnText = () => this.scrollingInterval ? 'Stop' : 'Start';

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<FileDialogComponent>) {
		this.title = data.title;
		this.titleTooltip = data.titleTooltip;
		this.content = data.content;

		this.dialogRef.afterClosed().subscribe(result => {
			this.stopScrolling();
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
		this.scrollSpeed = this.scrollSpeed + this.scrollSpeedInterval;
		this.updateScrollingSpeed();
	}

	closeDialog() {
		this.dialogRef.close();
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

	@HostListener('window:keydown', ['$event'])
	keyEvent(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter': this.toggleScroll(); break;
			case '-': this.decreaseScrollSpeed(); break;
			case '=': this.increaseScrollSpeed(); break;
			case 'Backspace': this.resetScolling(); break;
			case 'Escape': this.closeDialog(); break;
		}
	}
}
