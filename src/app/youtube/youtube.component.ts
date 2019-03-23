import { Component, OnInit } from '@angular/core';

import { YoutubeService } from '../_services/youtube.service';
import { YoutubePlaylistItem } from '../_models/youtube-playlist-item';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor(private youtubeService: YoutubeService) { }

  recommendedVideos: YoutubePlaylistItem[] = [];
  subscriptionVideos: YoutubePlaylistItem[] = [];

  ngOnInit() {
    //this.getWatchlistVideos(); API Doesn't support this right now
    this.getSubscriptionVideos();    
  }

  getWatchlistVideos(): void {
    this.youtubeService.getWatchlistVideos().subscribe(res => console.log(res));
  }

  getSubscriptionVideos(): void {
    this.youtubeService.getSubscriptionVideos().subscribe(res => this.subscriptionVideos = res.data, err => console.log(err));
  }
}
