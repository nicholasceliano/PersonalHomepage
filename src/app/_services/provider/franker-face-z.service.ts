import { Injectable } from '@angular/core';
import { TwitchChatMessageText } from 'src/app/_models/twitch/twitch-chat-message-text';
import { FFZEmotesResponse } from 'src/app/_models/ffz/ffz-emotes-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatEmote } from './logic/chat-emote';
import { FFZEmote } from 'src/app/_models/ffz/ffz-emote';


@Injectable({
	providedIn: 'root'
})
export class FrankerFaceZService extends ChatEmote {

	private imageSize = '1';
	protected channelName: string;
	protected emoteProviderAbbrv = 'FFZ';

	constructor(private http: HttpClient) { super(); }

	protected popuplateEmoteData(channelName: string) {
		if (channelName !== this.channelName) {
			this.emotes = [];
			this.channelName = channelName;

			this.getChannelEmotes().subscribe((resp) => this.setEmotesFromResponse(resp));
		}
	}

	protected setEmotesFromResponse(resp: FFZEmotesResponse) {
		resp.sets[resp.room.set].emoticons.forEach((e: FFZEmote) => this.emotes.push({
			text: e.name,
			emoteId: e.urls[this.imageSize]
		} as TwitchChatMessageText));
	}

	private getChannelEmotes(): Observable<FFZEmotesResponse> {
		return this.http.get<FFZEmotesResponse>(`https://api.frankerfacez.com/v1/room/${this.channelName}`);
	}
}
