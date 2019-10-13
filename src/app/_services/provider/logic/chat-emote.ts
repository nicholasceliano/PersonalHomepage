import { TwitchChatMessageText } from 'src/app/_models/twitch/twitch-chat-message-text';

export abstract class ChatEmote {

	private stringIndexHash = {};
	protected emotes: TwitchChatMessageText[] = [];
	protected abstract channelName: string;
	protected abstract emoteProviderAbbrv: string;
	protected abstract popuplateEmoteData(channelName: string);

	constructor() { }

	setEmotes(channelName: string, chatArray: TwitchChatMessageText[]) {
		this.popuplateEmoteData(channelName);
		const newChatArray: TwitchChatMessageText[] = [];

		chatArray.forEach((i) => {
			if (!i.isEmote) {
				const emotes: TwitchChatMessageText[] = this.getEmotesFromMsg(i.text);

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

	private getEmotesFromMsg(msg: string): TwitchChatMessageText[] {
		let chatArray: TwitchChatMessageText[] = [];

		chatArray = this.setEmotesToChatArray(chatArray, msg);
		chatArray = this.setNonEmoteTextToChatArray(chatArray, msg);

		return chatArray.sort((a, b) => (a.indexStart > b.indexStart) ? 1 : -1);
	}

	private setEmotesToChatArray(chatArray: TwitchChatMessageText[], msg: string): TwitchChatMessageText[] {
		let match;

		this.setStringIndexHash(msg);

		for (const e of this.emotes) {
			const regexp = new RegExp(e.text, 'g');
			// tslint:disable-next-line:no-conditional-assignment
			while ((match = regexp.exec(msg)) != null) {
				const emoteMsg = {
					text: `${this.emoteProviderAbbrv} - ${e.text}`,
					emoteId: e.emoteId,
					indexStart: match.index,
					indexEnd: match.index + e.text.length,
					isEmote: true
				} as TwitchChatMessageText;

				chatArray.push(emoteMsg);
				this.markEmoteStringIndexAsOccupied(emoteMsg);
			}
		}

		return chatArray;
	}

	private setNonEmoteTextToChatArray(chatArray: TwitchChatMessageText[], msg: string): TwitchChatMessageText[] {
		for (let i = 0; i < msg.length; i++) {
			if (this.stringIndexHash[i]) {
				const startIndex = i;
				for (let c = i; c < msg.length; c++) {
					if (!this.stringIndexHash[c] || c === msg.length - 1) {
						i = c;
						break;
					}
				}

				chatArray.push({
					text: msg.substring(startIndex, i),
					indexStart: startIndex,
					indexEnd: i,
					isEmote: false
				} as TwitchChatMessageText);
			}
		}

		return chatArray.sort((a, b) => (a.indexStart > b.indexStart) ? 1 : -1);
	}

	private setStringIndexHash(msg: string) {
		this.stringIndexHash = {};

		for (let i = 0; i < msg.length; i++) {
			this.stringIndexHash[i] = true;
		}
	}

	private markEmoteStringIndexAsOccupied(msg: TwitchChatMessageText) {
		for (let i = msg.indexStart; i < msg.indexEnd; i++) {
			this.stringIndexHash[i] = false;
		}
	}
}
