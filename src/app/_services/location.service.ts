import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Address } from '../_models/address';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor(private http: HttpClient) { }

	GetAddressFromCoords(lat: number, lon: number): Observable<Address> {
		return this.http.get<Address>(`${environment.apiEndpoint}/location/addressFromCoords?lat=${lat}&lon=${lon}`);
	}
}
