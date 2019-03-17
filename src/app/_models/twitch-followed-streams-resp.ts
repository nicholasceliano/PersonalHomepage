import { TwitchStream } from './twitch-stream';

export class TwitchFollowedStreamsResp {
    public _total: number;
    public streams: TwitchStream[];
}