import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../_models/apiresponse';
import { GmailThread } from '../_models/gmail-thread';
import { Observable } from 'rxjs';
import { GoogleService } from './google.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private http: HttpClient,
              private google: GoogleService) { }

  GetUnreadEmails(): Observable<APIResponse<GmailThread[]>> {
    return this.http.get<APIResponse<GmailThread[]>>(`${environment.apiEndpoint}/gmail/unreadEmails`, this.google.SetApiHeaders());
  }
}
