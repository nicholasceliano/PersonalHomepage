export interface AlertCountStrategy {
	count<T>(origObj: Array<T>, newObj: Array<T>, itemAlertCt: number): number;
}
