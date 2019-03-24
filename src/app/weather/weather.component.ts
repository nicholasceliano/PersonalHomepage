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

  public weatherData: WeatherData = new WeatherData();
  public locationData: Address = new Address();

  ngOnInit() {
    this.GetWeatherForecast();
  }

  private GetWeatherForecast() {
    navigator.geolocation.getCurrentPosition((res) => {
      this.locationService.GetAddressFromCoords(res.coords.latitude, res.coords.longitude).subscribe((res) => {
        this.locationData = res.data;
      }, (err => console.log(err)));

      this.weatherService.GetWeatherForcast(res.coords.latitude, res.coords.longitude).subscribe((res) => {
        this.weatherData = res.data
      }, (err) => console.log(err));
    }, (err) => {

      //show that user denied location access
      console.log(err)
    });
  }
}
