import { VideoPlayerPanel } from './video-player-panel';
import { IOAuthPanel } from 'src/app/_interfaces/ioauth-panel';

export abstract class OAuthVideoPlayerPanel extends VideoPlayerPanel implements IOAuthPanel {
	
	constructor(elementId: string, width: number, height: number, refreshTime: number) {
		super(elementId, width, height, refreshTime);
	}

	public panelAuthenticated = false;
	public signInUrl: string;

	public authenticate() {
		window.location.href = this.signInUrl;
	}
	protected failedAuthentication() {
		this.panelAuthenticated = false;
	}
}
