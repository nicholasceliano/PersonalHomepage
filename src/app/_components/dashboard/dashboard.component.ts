import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from '../structure/settings-dialog/settings-dialog.component';
import { LocalStorageService } from '../../_services/utility/local-storage.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		private title: Title,
		private dialog: MatDialog,
		private localStorageService: LocalStorageService) { }

	public panelSettings: any;

	ngOnInit() {
		this.title.setTitle(environment.appTitle);
		this.panelSettings = this.localStorageService.get(environment.localStorage.dashboardSettings);

		this.localStorageService.watchStorage().subscribe((localStorageItem) => {
			this.panelSettings = localStorageItem[environment.localStorage.dashboardSettings];
		});
	}

	showSettings() {
		this.dialog.open(SettingsDialogComponent, {
			disableClose: true,
			autoFocus: true,
			panelClass: 'settings-modalbox'
		});
	}
}
