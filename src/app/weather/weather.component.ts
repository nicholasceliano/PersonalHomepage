import { Component } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { WeatherData } from '../_models/weather-data';
import { LocationService } from '../_services/location.service';
import { Address } from '../_models/address';
import { environment } from 'src/environments/environment';
import { RefreshPanel } from '../_logic/panel/refresh-panel';
import { ObjectHelperService } from '../_services/utility/object-helper.service';

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
	public weatherData: WeatherData = new WeatherData();
	public locationData: Address = new Address();

	protected refreshPanel() {
		this.GetWeatherForecast();
	}

	private GetWeatherForecast() {
		navigator.geolocation.getCurrentPosition((res) => {
			this.locationServiceEnabled = true;
			this.locationService.GetAddressFromCoords(res.coords.latitude, res.coords.longitude).subscribe((locRes) => {
				if (!ObjectHelperService.objectsEqual(this.locationData, locRes)) {
					this.locationData = locRes;
				}
				this.locationDataLoaded = true;
			});

			this.weatherService.GetWeatherForcast(res.coords.latitude, res.coords.longitude).subscribe((weatherRes) => {
				if (!ObjectHelperService.objectsEqual(this.weatherData, weatherRes)) {
					this.weatherData = weatherRes;
				}
				this.weatherDataLoaded = true;
			});
		});
	}
}
