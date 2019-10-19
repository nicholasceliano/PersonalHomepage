import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TemperatureData } from '../_models/temperature-data';

@Injectable({
	providedIn: 'root'
})
export class PiService {

	constructor(private http: HttpClient) { }

	public GetTemperatureData(): Observable<TemperatureData> {
		return this.http.get<TemperatureData>(`${environment.apiEndpoint}/pi/temperature`);
	}
}
