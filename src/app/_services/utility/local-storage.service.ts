import { Injectable } from '@angular/core';
import { IDictionary } from 'src/app/_models/idictionary';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor() { }

	private lsSubscription = new Subject<IDictionary>();

	public watchStorage(): Observable<IDictionary> {
		return this.lsSubscription.asObservable();
	}

	public update(itemName: string, properties: IDictionary) {
		const lsJSON = this.get(itemName);

		if (lsJSON) {
			Object.keys(properties).forEach((key) => {
				lsJSON[key] = properties[key];
			});

			this.set(itemName, JSON.stringify(lsJSON));
		} else {
			this.set(itemName, JSON.stringify(properties));
		}
	}

	public get(itemName: string): any {
		return JSON.parse(localStorage.getItem(itemName));
	}

	private set(itemName: string, value: string) {
		localStorage.setItem(itemName, value);

		const dict = {};
		dict[itemName] = JSON.parse(value);
		this.lsSubscription.next(dict);
	}
}
