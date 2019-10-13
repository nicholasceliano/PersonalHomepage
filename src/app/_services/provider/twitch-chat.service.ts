import { Injectable } from '@angular/core';
import { TwitchChatMessage } from '../../_models/twitch-chat-message';
import { TwitchChatMessageText } from '../../_models/twitch-chat-message-text';
import { environment } from 'src/environments/environment';
import { BTTVService } from './bttv.service';

@Injectable({
	providedIn: 'root'
})
export class TwitchChatService {

	constructor(private bttv: BTTVService) { }

	private socket: WebSocket = null;

	public closeTwitchChat() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}

	public loadTwitchChat(
		channelName: string, twitchUsername: string, twitchOAuthToken: string,
		callback: (msg: TwitchChatMessage) => TwitchChatMessage) {

		this.closeTwitchChat();

		this.socket = new WebSocket(environment.twitchChatWSEndpoint);

		this.socket.onmessage = (message) => {
			let msgText = message.data;

			if (msgText.indexOf('PRIVMSG') > -1) {
				const chatBotMsgIdentifier = `${String.fromCharCode(0o1)}ACTION `;
				if (msgText.indexOf(chatBotMsgIdentifier) > -1) {
					msgText = msgText.replace(chatBotMsgIdentifier, '').replace(new RegExp(String.fromCharCode(0o1), 'g'), '');
				}

				const tagInfoEndIndex = msgText.indexOf(' :');
				const tagInfo = msgText.substring(1, tagInfoEndIndex);
				const chatInfo = msgText.substring(tagInfoEndIndex, msgText.length);

				const tagInfoHash = this.getMessageTagInfo(tagInfo);
				const chatMsg = this.getChatText(chatInfo, channelName);
				const nameColor = tagInfoHash.color;
				/* tslint:disable: no-string-literal */
				const displayName = tagInfoHash['display-name'];
				const emotes = tagInfoHash.emotes;

				let chatArray = this.setEmotesChatArray(emotes, chatMsg);
				chatArray = this.bttv.setEmotes(channelName, chatArray);

				callback({ username: displayName, msg: chatArray, color: nameColor } as TwitchChatMessage);
			}

			if (message.data.lastIndexOf('PING', 0) === 0) {
				this.socket.send('PONG :tmi.twitch.tv');
			}
		};

		this.socket.onopen = () => {
			this.socket.send('CAP REQ : twitch.tv/tags');
			this.socket.send(`PASS oauth:${twitchOAuthToken}`);
			this.socket.send(`NICK ${twitchUsername}`);
			this.socket.send(`JOIN #${channelName}`);
		};
	}

	private getMessageTagInfo(tagInfo: string): any {
		const tagInfoArray = tagInfo.split(';');
		const tagHash = {};

		if (tagInfoArray) {
			tagInfoArray.forEach(e => {
				const splitTagInfo = e.split('=');
				tagHash[splitTagInfo[0]] = splitTagInfo[1];
			});
		}

		return tagHash;
	}

	private getChatText(chatInfo: string, channelName: string): string {
		const chatStartIdentifier = `PRIVMSG #${channelName} :`;
		const messageStartIndex = chatInfo.indexOf(chatStartIdentifier) + chatStartIdentifier.length;
		const chatMsg = chatInfo.substring(messageStartIndex, chatInfo.length);

		return chatMsg;
	}

	private setEmotesChatArray(emotesTag, chatMsg: string): TwitchChatMessageText[] {
		const chatMsgTextArray: TwitchChatMessageText[] = [];

		if (emotesTag.length > 0) {
			const emoteArray = emotesTag.split('/');

			const emoteLocations = [];
			emoteArray.forEach((e) => {
				const eIdentifiers = e.split(':');
				const emoteId = eIdentifiers[0];
				const charLocations = eIdentifiers[1].split(',');

				charLocations.forEach((c) => {
					const cl = c.split('-');
					const charStart = cl[0];
					const charEnd = cl[1];

					emoteLocations.push({ id: emoteId, s: parseInt(charStart, 10), e: parseInt(charEnd, 10) });
				});
			});
			emoteLocations.sort((a, b) => (a.s < b.s ? -1 : 1));

			let lastStart = 0;
			emoteLocations.forEach(loc => {
				const chatString = chatMsg.substring(loc.s, loc.e + 1);
				const first = chatMsg.substring(lastStart, loc.s);

				chatMsgTextArray.push({ text: first, isEmote: false } as TwitchChatMessageText);
				chatMsgTextArray.push({ text: chatString, isEmote: true, emoteId: `https://static-cdn.jtvnw.net/emoticons/v1/${loc.id}/1.0` } as TwitchChatMessageText);

				lastStart = loc.e + 1;
			});

			chatMsgTextArray.push({ text: chatMsg.substring(lastStart, chatMsg.length), isEmote: false } as TwitchChatMessageText);
			lastStart = 0;
		} else {
			chatMsgTextArray.push({ text: chatMsg, isEmote: false } as TwitchChatMessageText);
		}

		return chatMsgTextArray;
	}
}
