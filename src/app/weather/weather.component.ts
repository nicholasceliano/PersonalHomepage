import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { WeatherData } from '../_models/weather-data';
import { LocationService } from '../_services/location.service';
import { Address } from '../_models/address';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService,
              private locationService: LocationService) { }

  public locationServiceEnabled: boolean;
  public weatherDataLoaded = false;
  public locationDataLoaded = false;
  public weatherData: WeatherData = new WeatherData();
  public locationData: Address = new Address();

  ngOnInit() {
    this.GetWeatherForecast();
  }

  private GetWeatherForecast() {
    navigator.geolocation.getCurrentPosition((res) => {
      this.locationServiceEnabled = true;
      this.locationService.GetAddressFromCoords(res.coords.latitude, res.coords.longitude).subscribe((locRes) => {
        this.locationData = locRes.data;
        this.locationDataLoaded = true;
      }, (err => console.log(err)));

      this.weatherService.GetWeatherForcast(res.coords.latitude, res.coords.longitude).subscribe((weatherRes) => {
        this.weatherData = weatherRes.data;
        this.weatherDataLoaded = true;
      }, (err) => console.log(err));
    }, (err) => {
      this.locationServiceEnabled = false;
    });
  }
}
