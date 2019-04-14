import { Injectable } from '@angular/core';
import { ObjectHelperService } from './utility/object-helper.service';
import { AlertCountStrategy } from 'src/app/_interfaces/alert-count-strategy';
import $ from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AlertsService {

	private itemAlertCt = 0;

	constructor() {
		this.setTitleClearEvents();
	}

	checkAlerts<T>(type: string, alertCountStrategy: AlertCountStrategy, origObj: Array<T>, newObj: Array<T>, panelLoaded: boolean): T[] {
		if (!ObjectHelperService.objectsEqual(origObj, newObj)) {
			if (panelLoaded) {
				this.itemAlertCt = alertCountStrategy.count(origObj, newObj, this.itemAlertCt);

				if (this.itemAlertCt > 0) {
					if (document.title !== environment.appTitle && !(document.title.indexOf(type) > -1)) {
						const alertCt = parseInt(document.title.split('New Alerts')[0].trim(), 10) + 1;

						document.title = `${alertCt} New Alerts - ${environment.appTitle}`;
					} else {
						document.title = `(${this.itemAlertCt}) New ${type}${this.itemAlertCt > 1 ? 's' : ''} - ${environment.appTitle}`;
					}
				}
			}
			return newObj;
		}

		return origObj;
	}

	private setTitleClearEvents() {
		const _this = this;

		$(window).mousemove(() => {
			setTimeout(() => {
				document.title = environment.appTitle;
				_this.itemAlertCt = 0;
			}, 5000);
		});
	}
}
