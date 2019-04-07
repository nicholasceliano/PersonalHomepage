import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GuitarTabsService {

	constructor(private http: HttpClient) { }

	getGuitarTabs() {
		return this.http.get<object>(`${environment.apiEndpoint}/files/guitarTabs`);
	}

	openGuitarTab(guitarTabId) {
		return this.http.get<object>(`${environment.apiEndpoint}/files/openFile`);
	}
}
