import { ThemeItemDirective } from './theme-item.directive';
import { ElementRef } from '@angular/core';
import { LocalStorageService } from '../_services/utility/local-storage.service';

describe('ThemeItemDirective', () => {
	it('should create an instance', () => {
		const directive = new ThemeItemDirective(new ElementRef(''), new LocalStorageService());
		expect(directive).toBeTruthy();
	});
});
