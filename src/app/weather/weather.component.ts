import { Component } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { WeatherData } from '../_models/weather-data';
import { LocationService } from '../_services/location.service';
import { Address } from '../_models/address';
import { PanelRefreshService } from '../_services/panel/panel-refresh.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.css']
})
export class WeatherComponent extends PanelRefreshService {

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
				this.locationData = this.checkAlerts(this.locationData, locRes);
				this.locationDataLoaded = true;
			});

			this.weatherService.GetWeatherForcast(res.coords.latitude, res.coords.longitude).subscribe((weatherRes) => {
				this.weatherData = this.checkAlerts(this.weatherData, weatherRes);
				this.weatherDataLoaded = true;
			});
		});
	}
}
