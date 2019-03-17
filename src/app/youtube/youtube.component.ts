import { Component, OnInit } from '@angular/core';

import { YoutubeService } from '../_services/youtube.service';
import { WatchlistVideo } from '../_models/watchlist-video';
import { SubscriptionVideo } from '../_models/subscription-video';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }

  watchlistVideos: WatchlistVideo[];
  subscriptionVideos: SubscriptionVideo[];

  ngOnInit() {
    this.getWatchlistVideos();
    this.getSubscriptionVideos();    
  }

  getWatchlistVideos(): void {
    this.youtubeService.getWatchlistVideos().subscribe(watchlistVideos => this.watchlistVideos = watchlistVideos);
  }

  getSubscriptionVideos(): void {
    this.youtubeService.getSubscriptionVideos().subscribe(subscriptionVideos => this.subscriptionVideos = subscriptionVideos);
  }
}
