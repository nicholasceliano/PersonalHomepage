import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GmailThread } from '../_models/gmail-thread';
import { Observable } from 'rxjs';
import { GoogleService } from './provider/google.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GmailService {

	constructor(
		private http: HttpClient,
		private google: GoogleService) { }

	GetUnreadEmails(): Observable<GmailThread[]> {
		return this.http.get<GmailThread[]>(`${environment.apiEndpoint}/gmail/unreadEmails`, this.google.SetApiHeaders());
	}
}
