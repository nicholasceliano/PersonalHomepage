import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { KeyMapsService } from 'src/app/_services/utility/key-maps.service';
import { LocalStorageService } from 'src/app/_services/utility/local-storage.service';
import { environment } from 'src/environments/environment';
import { IDictionary } from 'src/app/_models/idictionary';

@Component({
	selector: 'app-settings',
	templateUrl: './settings-dialog.component.html',
	styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<SettingsDialogComponent>,
		private keyMapService: KeyMapsService,
		private localStorageService: LocalStorageService
	) { }

	public settings: any[];
	public themeItems: any[] = [{id: 'swDarkTheme', text: 'Dark Theme'}];
	public panelItems: any[] = [
		{id: 'swPanelGmail', text: 'Gmail Panel'},
		{id: 'swPanelQuotes', text: 'Quotes Panel'},
		{id: 'swPanelFinancial', text: 'Financial Panel'},
		{id: 'swPanelYoutube', text: 'Youtube Panel'},
		{id: 'swPanelPodcasts', text: 'Podcasts Panel'},
		{id: 'swPanelWeather', text: 'Weather Panel'},
		{id: 'swPanelTabs', text: 'Guitar Tabs Panel'},
		{id: 'swPanelTwitch', text: 'Twitch Panel'},
		{id: 'swPanelGoogleDrive', text: 'Google Drive Panel'},
	];

	ngOnInit() {
		this.settings = this.localStorageService.get(environment.localStorage.dashboardSettings);
		this.panelItems.forEach(item => { // default panel items to visible if no local storage
			item.checked = (this.settings && this.settings[item.id] === false) ? false : true;
		});
	}

	public changeSetting(e) {
		const dict: IDictionary = {};
		dict[e.target.id] = e.target.checked;

		this.localStorageService.update(environment.localStorage.dashboardSettings, dict);
	}

	public closeDialog() {
		this.dialogRef.close();
	}

	@HostListener('window:keydown', ['$event'])
	keyDownEvent(event: KeyboardEvent) {
		this.keyMapService.keys[event.key] = true;

		if (this.keyMapService.keys.Escape) {
			this.closeDialog();
		}
	}
}
