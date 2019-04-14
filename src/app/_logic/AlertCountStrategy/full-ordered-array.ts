import { AlertCountStrategy } from 'src/app/_interfaces/alert-count-strategy';

export class FullOrderedArrayAlertCountStrategy implements AlertCountStrategy {
	count<T>(origObj: Array<T>, newObj: Array<T>, itemAlertCt: number): number {
		for (const oO of origObj) {
			const origJSON = JSON.stringify(oO);

			for (const nO of newObj) {
				const newJSON = JSON.stringify(nO);

				console.log(origJSON === newJSON);
				if (origJSON === newJSON) {
					break;
				} else {
					itemAlertCt++;
				}
			}
			break;
		}

		return itemAlertCt;
	}
}
