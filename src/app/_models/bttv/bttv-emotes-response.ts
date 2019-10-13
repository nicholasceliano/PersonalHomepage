import { BTTVEmote } from './bttv-emote';

export class BTTVEmotesResponse {
	status: number;
	urlTemplate: string;
	emotes: BTTVEmote[];
}
