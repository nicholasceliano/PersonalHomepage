import { IOAuthPanel } from 'src/app/_interfaces/ioauth-panel';
import { RefreshPanel } from './refresh-panel';

export abstract class OAuthPanel extends RefreshPanel implements IOAuthPanel {

	constructor(refreshTime) {
		super(refreshTime);
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
