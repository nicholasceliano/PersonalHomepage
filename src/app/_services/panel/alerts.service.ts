import { Injectable } from '@angular/core';
import { ObjectHelperService } from '../utility/object-helper.service';

@Injectable({
	providedIn: 'root'
})
export class AlertsService {

	constructor() { }

	checkAlerts<T>(origObj: T, newObj: T): T {
		if (!ObjectHelperService.objectsEqual(origObj, newObj)) {
			return newObj;
		}

		return origObj;
	}
}
