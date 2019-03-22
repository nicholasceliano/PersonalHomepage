import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { WatchlistVideo } from '../_models/watchlist-video';
import { SubscriptionVideo } from '../_models/subscription-video';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/apiresponse';
import { GoogleService } from './google.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient,
    private google: GoogleService) { }

  getWatchlistVideos(): Observable<APIResponse<WatchlistVideo[]>> {
    return this.http.get<APIResponse<WatchlistVideo[]>>(`${environment.apiEndpoint}/youtube/watchlist`, this.google.SetGoogleApiHeaders());
  }

  getSubscriptionVideos(): Observable<APIResponse<SubscriptionVideo[]>> {
    return this.http.get<APIResponse<SubscriptionVideo[]>>(`${environment.apiEndpoint}/youtube/subscription`, this.google.SetGoogleApiHeaders())
  }
}