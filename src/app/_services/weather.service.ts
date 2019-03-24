import { Injectable } from '@angular/core';
import { APIResponse } from '../_models/apiresponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../_models/weather-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  GetWeatherForcast(lat: number, lon: number): Observable<APIResponse<WeatherData>> {
    return this.http.get<APIResponse<WeatherData>>(`${environment.apiEndpoint}/weather/currentWeather?lat=${lat}&lon=${lon}`);
  }
}
