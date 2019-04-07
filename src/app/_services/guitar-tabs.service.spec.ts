import { TestBed } from '@angular/core/testing';

import { GuitarTabsService } from './guitar-tabs.service';

describe('GuitarTabsService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: GuitarTabsService = TestBed.get(GuitarTabsService);
		expect(service).toBeTruthy();
	});
});
