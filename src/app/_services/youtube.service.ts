import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GoogleService } from './provider/google.service';
import { YoutubePlaylistItem } from '../_models/youtube-playlist-item';

@Injectable({
	providedIn: 'root'
})
export class YoutubeService {

	constructor(
		private http: HttpClient,
		private google: GoogleService) { }

	getSubscriptionVideos(): Observable<YoutubePlaylistItem[]> {
		return this.http.get<YoutubePlaylistItem[]>(`${environment.apiEndpoint}/youtube/subscription`,
			this.google.SetApiHeaders());
	}
}
