import { Injectable, HostListener } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class KeyMapsService {

	constructor() {
		window.addEventListener('keyup', (event) => { // @HostListener('window:keyup', ['$event']) - only available in Components
			this.keys[event.key] = false;
		});
	}

	public keys = {
		Enter: false,
		'-': false,
		'=': false,
		Backspace: false,
		Escape: false,
		' ': false,
		Shift: false
	};
}
