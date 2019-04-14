import { Component } from '@angular/core';
import { GuitarTabsService } from '../_services/guitar-tabs.service';
import { Folder } from '../_models/folder';
import { MatDialog } from '@angular/material';
import { FileDialogComponent } from '../structure/file-dialog/file-dialog.component';
import { environment } from 'src/environments/environment';
import { RefreshPanel } from '../_logic/panel/refresh-panel';
import { ObjectHelperService } from '../_services/utility/object-helper.service';

@Component({
	selector: 'app-guitar-tabs',
	templateUrl: './guitar-tabs.component.html',
	styleUrls: ['./guitar-tabs.component.css']
})
export class GuitarTabsComponent extends RefreshPanel {

	constructor(
		private gts: GuitarTabsService,
		private dialog: MatDialog) {
			super(environment.defaultRefreshTime);
		}

	public guitarTabsFolders: Folder[] = [];

	openGuitarTab(path: string, name: string, type: string) {
		const fileName = name + type;
		this.gts.openGuitarTab(path, fileName).subscribe((res) => {
			if (res) {
				this.dialog.open(FileDialogComponent, {
					data: {
						title: `${res.path.replace('/', '')} - ${res.name}`,
						titleTooltip: `File Name: ${res.name + res.type}\nCreate Date: ${new Date(res.createDate).toLocaleString()}\n` +
										`Edit Date: ${new Date(res.editDate).toLocaleString()}\nSize: ${res.size}`,
						content: res.fileData,
					},
					disableClose: true,
					autoFocus: true,
					panelClass: 'files-modalbox'
				});
			}
		});
	}

	protected refreshPanel() {
		this.getGuitarTabs();
	}

	private getGuitarTabs() {
		this.gts.getGuitarTabs().subscribe((res) => {
			if (!ObjectHelperService.objectsEqual(this.guitarTabsFolders, res)) {
				this.guitarTabsFolders = res;
			}
		});
	}
}
