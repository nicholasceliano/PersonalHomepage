import { Component } from '@angular/core';
import { RefreshPanel } from 'src/app/_logic/panel/refresh-panel';
import { environment } from 'src/environments/environment';
import { PiService } from 'src/app/_services/pi.service';
import { finalize } from 'rxjs/operators';
import { TemperatureData } from 'src/app/_models/temperature-data';

@Component({
	selector: 'app-temperature',
	templateUrl: './temperature.component.html',
	styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent extends RefreshPanel {

	public temperatureData: TemperatureData;

	constructor(private piService: PiService) {
		super(environment.defaultRefreshTime);
	}

	refreshPanel() {
		this.GetTemperatureData();
	}

	private GetTemperatureData() {
		this.piService.GetTemperatureData().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
			this.temperatureData = res;
		});
	}
}
