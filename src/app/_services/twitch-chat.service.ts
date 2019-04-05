import { Injectable } from '@angular/core';
import { TwitchChatMessage } from '../_models/twitch-chat-message';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TwitchChatService {

	constructor() { }

	private socket: WebSocket = null;

	public loadTwitchChat(
		channelName: string, twitchUsername: string, twitchOAuthToken: string,
		callback: (msg: TwitchChatMessage) => TwitchChatMessage) {

		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}

		this.socket = new WebSocket(environment.twitchChatWSEndpoint);

		this.socket.onmessage = (message) => {
			const msgText = message.data;

			if (msgText.indexOf('PRIVMSG') > -1) {
				const tagInfoEndIndex = msgText.indexOf(' :');
				const tagInfo = msgText.substring(1, tagInfoEndIndex);
				const chatInfo = msgText.substring(tagInfoEndIndex, msgText.length);

				const tagInfoHash = this.getMessageTagInfo(tagInfo);
				let chatMsg = this.getChatText(chatInfo, channelName);
				/* tslint:disable: no-string-literal */
				const nameColor = tagInfoHash['color'];
				const displayName = tagInfoHash['display-name'];
				const emotes = tagInfoHash['emotes'];

				chatMsg = this.setChatEmotes(emotes, chatMsg);

				callback({ username: displayName, msg: chatMsg, color: nameColor } as TwitchChatMessage);
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

	private getMessageTagInfo(tagInfo: string) {
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

	private setChatEmotes(emotesTag, chatMsg: string): string {
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
			emoteLocations.sort((a, b) => (a.s > b.s ? -1 : 1));

			emoteLocations.forEach(loc => {
				const chatString = chatMsg.substring(loc.s, loc.e + 1);
				const first = chatMsg.substring(0, loc.s);
				const last = chatMsg.substring(loc.e + 1, chatMsg.length);

				chatMsg = `${first}<img src="http://static-cdn.jtvnw.net/emoticons/v1/${loc.id}/1.0" title="${chatString}" />${last}`;
			});
		}

		return chatMsg;
	}
}
