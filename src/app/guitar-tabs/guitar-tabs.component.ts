import { Component, OnInit } from '@angular/core';
import { GuitarTabsService } from '../_services/guitar-tabs.service';
import { Folder } from '../_models/folder';
import { MatDialog } from '@angular/material';
import { FileDialogComponent } from '../structure/file-dialog/file-dialog.component';

@Component({
	selector: 'app-guitar-tabs',
	templateUrl: './guitar-tabs.component.html',
	styleUrls: ['./guitar-tabs.component.css']
})
export class GuitarTabsComponent implements OnInit {

	constructor(
		private gts: GuitarTabsService,
		private dialog: MatDialog) { }

	public guitarTabsFolders: Folder[] = [];

	ngOnInit() {
		this.getGuitarTabs();
	}

	private getGuitarTabs() {
		this.gts.getGuitarTabs().subscribe((res) => {
			this.guitarTabsFolders = res;
		});
	}

	openGuitarTab(path: string, name: string, type: string) {
		const fileName = name + type;
		this.gts.openGuitarTab(path, fileName).subscribe((res) => {
			this.dialog.open(FileDialogComponent, {
				data: {
					title: res.path + ' ' + res.name,
					content: res.fileData,
				},
				disableClose: true,
				autoFocus: true
			});
		});
	}
}
