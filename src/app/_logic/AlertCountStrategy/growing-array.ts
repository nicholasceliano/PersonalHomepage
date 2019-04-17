import { AlertCountStrategy } from 'src/app/_interfaces/alert-count-strategy';
import { ObjectHelperService } from 'src/app/_services/utility/object-helper.service';

export class GrowingArrayAlertCountStrategy implements AlertCountStrategy {
	count<T>(origObj: Array<T>, newObj: Array<T>, itemAlertCt: number): number {
		if (!ObjectHelperService.objectsEqual(origObj, newObj)) {
			if (newObj.length > origObj.length) {
				itemAlertCt = itemAlertCt + (newObj.length - origObj.length);
			}
		}

		return itemAlertCt;
	}
}
