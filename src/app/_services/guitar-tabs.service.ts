import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Folder } from '../_models/folder';
import { FolderFile } from '../_models/folder-file';

@Injectable({
	providedIn: 'root'
})
export class GuitarTabsService {

	constructor(private http: HttpClient) { }

	getGuitarTabs() {
		return this.http.get<Folder[]>(`${environment.apiEndpoint}/files/guitarTabs`);
	}

	openGuitarTab(path: string, fileName: string) {
		return this.http.get<FolderFile>(`${environment.apiEndpoint}/files/openFile?type=1&` +
										`path=${encodeURI(path)}&fileName=${encodeURI(fileName)}`);
	}
}
