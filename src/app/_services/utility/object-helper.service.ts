import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ObjectHelperService {

	constructor() { }

	static objectsEqual<T>(obj1: T, obj2: T) {
		return (JSON.stringify(obj1) === JSON.stringify(obj2));
	}
}
