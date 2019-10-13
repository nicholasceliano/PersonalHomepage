import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BTTVEmotesResponse } from 'src/app/_models/bttv/bttv-emotes-response';
import { TwitchChatMessageText } from 'src/app/_models/twitch/twitch-chat-message-text';
import { Observable } from 'rxjs';
import { ChatEmote } from './logic/chat-emote';

@Injectable({
	providedIn: 'root'
})
export class BTTVService extends ChatEmote {

	private imageSize = '1x';
	private bttvAPIUrl = 'https://api.betterttv.net/2';
	protected channelName: string;
	protected emoteProviderAbbrv = 'BTTV';

	constructor(private http: HttpClient) { super(); }

	protected popuplateEmoteData(channelName: string) {
		if (channelName !== this.channelName) {
			this.emotes = [];
			this.channelName = channelName;

			this.getEmotes().subscribe((resp) => this.setEmotesFromResponse(resp));
			this.getChannelEmotes().subscribe((resp) => this.setEmotesFromResponse(resp));
		}
	}

	protected setEmotesFromResponse(resp: BTTVEmotesResponse) {
		if (resp.status === 200) {
			resp.emotes.forEach((e) => {
				this.emotes.push({
					text: e.code,
					emoteId: resp.urlTemplate.replace('{{id}}', e.id).replace('{{image}}', this.imageSize)
				} as TwitchChatMessageText);
			});
		}
	}

	private getEmotes(): Observable<BTTVEmotesResponse> {
		return this.http.get<BTTVEmotesResponse>(`${this.bttvAPIUrl}/emotes`);
	}

	private getChannelEmotes(): Observable<BTTVEmotesResponse> {
		return this.http.get<BTTVEmotesResponse>(`${this.bttvAPIUrl}/channels/${this.channelName}`);
	}
}
