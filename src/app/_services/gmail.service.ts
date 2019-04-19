import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GmailThread } from '../_models/gmail/gmail-thread';
import { Observable } from 'rxjs';
import { GoogleService } from './provider/google.service';
import { environment } from 'src/environments/environment';
import { GmailModifyThreadResponse } from '../_models/gmail/gmail-modify-thread-response';

@Injectable({
	providedIn: 'root'
})
export class GmailService {

	constructor(
		private http: HttpClient,
		private google: GoogleService) { }

	GetUnreadThreads(): Observable<GmailThread[]> {
		return this.http.get<GmailThread[]>(`${environment.apiEndpoint}/gmail/unreadThreads`, this.google.SetApiHeaders());
	}

	MarkThreadAsRead(threadId: string): Observable<GmailModifyThreadResponse> {
		return this.http.put<GmailModifyThreadResponse>(`${environment.apiEndpoint}/gmail/readThread/${threadId}`,
															null, this.google.SetApiHeaders());
	}
}
