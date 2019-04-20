import { timer } from 'rxjs';

export abstract class RefreshPanel {

	constructor(refreshTime) {
		this.setRefreshTime(refreshTime);
	}

	public isPanelLoaded = false;
	public abstract refreshPanel(): void;

	protected setRefreshTime(refreshTime) {
		timer(0, refreshTime).subscribe(() => this.refreshPanel());
	}
}
