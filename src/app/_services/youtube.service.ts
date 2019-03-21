import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { WatchlistVideo } from '../_models/watchlist-video';
import { SubscriptionVideo } from '../_models/subscription-video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private watchlistVideosUrl = 'api/youtube/watchlistVideos';
  private subscriptionVideosUrl = 'api/youtube/subscriptionVideos';

  getWatchlistVideos(): Observable<WatchlistVideo[]> {
    return this.http.get<WatchlistVideo[]>(this.watchlistVideosUrl);
  }

  getSubscriptionVideos(): Observable<SubscriptionVideo[]> {
    return this.http.get<SubscriptionVideo[]>(this.subscriptionVideosUrl);
  }
}