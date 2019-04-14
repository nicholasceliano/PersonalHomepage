import { AlertCountStrategy } from 'src/app/_interfaces/alert-count-strategy';

export class RandomChangingArrayAlertCountStrategy implements AlertCountStrategy {
	private uniqueArrayProperty: string;

	constructor(uniqueArrayProperty: string) {
		this.uniqueArrayProperty = uniqueArrayProperty;
	}

	count<T>(origObj: Array<T>, newObj: Array<T>, itemAlertCt: number): number {
		for (const nO of newObj) {
			const n = nO[this.uniqueArrayProperty];
			let newItem = true;

			for (const oO of origObj) {
				const o = oO[this.uniqueArrayProperty];
				if (o === n) {
					newItem = false;
					break;
				}
				newItem = true;
			}

			if (newItem) {
				itemAlertCt++;
			}
		}

		return itemAlertCt;
	}
}
