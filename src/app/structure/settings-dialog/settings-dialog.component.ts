import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { KeyMapsService } from 'src/app/_services/utility/key-maps.service';
import { LocalStorageService } from 'src/app/_services/utility/local-storage.service';
import $ from 'jquery';
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

	ngOnInit() {
		this.loadSettings();
	}

	public changeSetting(e) {
		const dict: IDictionary = {};
		dict[e.target.id] = e.target.checked;

		this.localStorageService.update(environment.localStorage.dashboardSettings, dict);
	}

	public closeDialog() {
		this.dialogRef.close();
	}

	private loadSettings() {
		const lsJSON = this.localStorageService.get(environment.localStorage.dashboardSettings);

		Object.keys(lsJSON).forEach((key) => {
			$(`#${key}`).prop('checked', lsJSON[key]); // Only checkboxes for now...will extend if other setting types
		});
	}

	@HostListener('window:keydown', ['$event'])
	keyDownEvent(event: KeyboardEvent) {
		this.keyMapService.keys[event.key] = true;

		if (this.keyMapService.keys.Escape) {
			this.closeDialog();
		}
	}
}
