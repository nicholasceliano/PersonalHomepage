import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class KeyMapsService {
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
