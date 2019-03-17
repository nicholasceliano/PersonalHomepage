import { TwitchChannel } from './twitch-channel';

export class TwitchStream {
    public channel: TwitchChannel;
    public game: string;
    public viewers: number;
}