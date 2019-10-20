import { Component } from '@angular/core';
import { WeatherService } from '../../_services/weather.service';
import { WeatherData } from '../../_models/weather-data';
import { LocationService } from '../../_services/location.service';
import { Address } from '../../_models/address';
import { environment } from 'src/environments/environment';
import { RefreshPanel } from '../../_logic/panel/refresh-panel';
import { ObjectHelperService } from '../../_services/utility/object-helper.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.css']
})
export class WeatherComponent extends RefreshPanel {

	constructor(
		private weatherService: WeatherService,
		private locationService: LocationService) {
			super(environment.defaultRefreshTime);
		}

	public locationServiceEnabled: boolean;
	public weatherDataLoaded = false;
	public locationDataLoaded = false;
	public weatherData: WeatherData;
	public locationData: Address = new Address();

	refreshPanel() {
		this.GetWeatherForecast();
	}

	private evalPanelLoaded() {
		this.isPanelLoaded = (this.weatherDataLoaded && this.locationDataLoaded);
	}

	private GetWeatherForecast() {
		navigator.geolocation.getCurrentPosition((res) => {
			this.locationServiceEnabled = true;
			this.locationService.GetAddressFromCoords(res.coords.latitude, res.coords.longitude).pipe(finalize(() => {
				this.locationDataLoaded = true;
				this.evalPanelLoaded();
			})).subscribe((locRes) => {
				if (!ObjectHelperService.objectsEqual(this.locationData, locRes)) {
					this.locationData = locRes;
				}
			});

			this.weatherService.GetWeatherForcast(res.coords.latitude, res.coords.longitude).pipe(finalize(() => {
				this.weatherDataLoaded = true;
				this.evalPanelLoaded();
			})).subscribe((weatherRes) => {
				if (!ObjectHelperService.objectsEqual(this.weatherData, weatherRes)) {
					this.weatherData = weatherRes;
				}
			});
		});
	}
}
