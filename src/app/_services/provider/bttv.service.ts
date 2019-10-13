import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BTTVEmotesResponse } from 'src/app/_models/BTTVEmotesResponse';
import { BTTVEmote } from 'src/app/_models/BTTVEmote';
import { TwitchChatMessageText } from 'src/app/_models/twitch-chat-message-text';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BTTVService {

	private urlTemplate: string;
	private channelName: string;
	private emotes: BTTVEmote[] = [];
	private imageSize = '1x';
	private stringIndexHash = {};

	constructor(private http: HttpClient) { }

	setEmotes(channelName: string, chatArray: TwitchChatMessageText[]) {
		this.popuplateEmoteData(channelName);
		const newChatArray: TwitchChatMessageText[] = [];

		chatArray.forEach((i) => {
			if (!i.isEmote) {
				const emotes: any[] = this.getBTTVEmotesFromMsg(i.text);

				if (emotes.length > 0) {
					emotes.forEach((e) => newChatArray.push(e));
				} else {
					newChatArray.push(i);
				}
			} else {
				newChatArray.push(i);
			}
		});

		return newChatArray;
	}

	private getBTTVEmotesFromMsg(msg: string): TwitchChatMessageText[] {
		let match;
		const matches: TwitchChatMessageText[] = [];

		this.setStringIndexHash(msg);

		for (const e of this.emotes) {
			const regexp = new RegExp(e.code, 'g');
			// tslint:disable-next-line:no-conditional-assignment
			while ((match = regexp.exec(msg)) != null) {
				const emoteMsg = {
					text: `BTTV - ${e.code}`,
					emoteId: this.urlTemplate.replace('{{id}}', e.id).replace('{{image}}', this.imageSize),
					indexStart: match.index,
					indexEnd: match.index + e.code.length,
					isEmote: true
				} as TwitchChatMessageText;

				matches.push(emoteMsg);
				this.markEmoteStringIndexAsOccupied(emoteMsg);
			}
		}

		for (let i = 0; i < msg.length; i++) {
			if (this.stringIndexHash[i]) {
				const startIndex = i;
				for (let c = i; c < msg.length; c++) {
					if (!this.stringIndexHash[c] || c === msg.length - 1) {
						i = c;
						break;
					}
				}

				matches.push({
					text: msg.substring(startIndex, i),
					indexStart: startIndex,
					indexEnd: i,
					isEmote: false
				} as TwitchChatMessageText);
			}
		}

		return matches.sort((a, b) => (a.indexStart > b.indexStart) ? 1 : -1);
	}

	private setStringIndexHash(msg: string) {
		for (let i = 0; i < msg.length; i++) {
			this.stringIndexHash[i] = true;
		}

		return this.stringIndexHash;
	}

	private markEmoteStringIndexAsOccupied(msg: TwitchChatMessageText) {
		for (let i = msg.indexStart; i < msg.indexEnd; i++) {
			this.stringIndexHash[i] = false;
		}
	}

	private popuplateEmoteData(channelName: string) {
		if (channelName !== this.channelName) {
			this.emotes = [];
			this.channelName = channelName;

			this.getEmotes().subscribe((resp: BTTVEmotesResponse) => {
				if (resp.status === 200) {
					this.urlTemplate = 'https:' + resp.urlTemplate;
					resp.emotes.forEach((e) => {
						this.emotes.push(e);
					});
				}
			});

			this.getChannelEmotes().subscribe((resp: BTTVEmotesResponse) => {
				if (resp.status === 200) {
					this.urlTemplate = 'https:' + resp.urlTemplate;
					resp.emotes.forEach((e) => {
						this.emotes.push(e);
					});
				}
			});
		}
	}

	private getEmotes(): Observable<BTTVEmotesResponse> {
		return this.http.get<BTTVEmotesResponse>('https://api.betterttv.net/2/emotes');
	}

	private getChannelEmotes(): Observable<BTTVEmotesResponse> {
		return this.http.get<BTTVEmotesResponse>(`https://api.betterttv.net/2/channels/${this.channelName}`);
	}
}
