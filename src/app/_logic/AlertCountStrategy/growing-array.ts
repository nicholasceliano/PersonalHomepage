import { AlertCountStrategy } from 'src/app/_interfaces/alert-count-strategy';

export class GrowingArrayAlertCountStrategy implements AlertCountStrategy {
	count<T>(origObj: Array<T>, newObj: Array<T>, itemAlertCt: number): number {
		if (newObj.length > origObj.length) {
			itemAlertCt = itemAlertCt + (newObj.length - origObj.length);
		}

		return itemAlertCt;
	}
}
