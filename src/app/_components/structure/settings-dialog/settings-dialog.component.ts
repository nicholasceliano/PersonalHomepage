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
	public settingItems: any[] = [
		{id: 'swDarkTheme', text: 'Dark Theme', type: 'theme'},
		{id: 'swPanelGmail', text: 'Gmail Panel', type: 'panel'},
		{id: 'swPanelQuotes', text: 'Quotes Panel', type: 'panel'},
		{id: 'swPanelFinancial', text: 'Financial Panel', type: 'panel'},
		{id: 'swPanelYoutube', text: 'Youtube Panel', type: 'panel'},
		{id: 'swPanelPodcasts', text: 'Podcasts Panel', type: 'panel'},
		{id: 'swPanelWeather', text: 'Weather Panel', type: 'panel'},
		{id: 'swPanelTabs', text: 'Guitar Tabs Panel', type: 'panel'},
		{id: 'swPanelTwitch', text: 'Twitch Panel', type: 'panel'},
		{id: 'swPanelGoogleDrive', text: 'Google Drive Panel', type: 'panel'},
	];

	ngOnInit() {
		this.settings = this.localStorageService.get(environment.localStorage.dashboardSettings);
		this.settingItems.forEach(item => {
			if (item.type === 'panel') { // default panel items to checked if no local storage
				item.checked = (this.settings && this.settings[item.id] === false) ? false : true;
			} else {
				item.checked = (this.settings && this.settings[item.id] === true) ? true : false;
			}
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
