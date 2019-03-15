import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { WatchlistVideo } from './watchlist-video';
import { SubscriptionVideo } from './subscription-video';

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
