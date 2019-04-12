import { timer } from 'rxjs';
import { AlertsService } from './alerts.service';

export abstract class PanelRefreshService extends AlertsService {

	constructor(refreshTime) {
		super();
		this.setPanelRefresh(refreshTime);
	}

	protected abstract refreshPanel(): void;

	protected setPanelRefresh(refreshTime) {
		timer(0, refreshTime).subscribe(() => this.refreshPanel());
	}
}
