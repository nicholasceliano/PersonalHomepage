import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/apiresponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Address } from '../_models/address';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor(private http: HttpClient) { }

	GetAddressFromCoords(lat: number, lon: number): Observable<APIResponse<Address>> {
		return this.http.get<APIResponse<Address>>(`${environment.apiEndpoint}/location/addressFromCoords?lat=${lat}&lon=${lon}`);
	}
}
