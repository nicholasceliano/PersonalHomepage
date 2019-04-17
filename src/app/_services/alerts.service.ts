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
		if (panelLoaded) {
			const newAlertCt = alertCountStrategy.count(origObj, newObj, this.itemAlertCt);
			if (newAlertCt > this.itemAlertCt) {
				this.itemAlertCt = newAlertCt
			
				if (this.itemAlertCt > 0) {
					if (document.title !== environment.appTitle && !(document.title.indexOf(type) > -1)) {
						if (document.title.indexOf('New Alerts') > -1) {
							parseInt(document.title.split('New Alerts')[0].trim(), 10) + 1;
						}

						document.title = `${this.itemAlertCt} New Alerts - ${environment.appTitle}`;
					} else {
						document.title = `(${this.itemAlertCt}) New ${type}${this.itemAlertCt > 1 ? 's' : ''} - ${environment.appTitle}`;
					}
				}	
			}
		}

		return (ObjectHelperService.objectsEqual(origObj, newObj)) ? origObj : newObj;
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
