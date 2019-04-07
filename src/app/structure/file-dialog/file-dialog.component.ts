import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-file-dialog',
	templateUrl: './file-dialog.component.html',
	styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {

	public title: string;
	public content;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.title = data.title;
		this.content = data.content;
	}

	ngOnInit() {
	}
}
