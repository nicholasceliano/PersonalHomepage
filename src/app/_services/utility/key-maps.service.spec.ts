import { TestBed } from '@angular/core/testing';

import { KeyMapsService } from './key-maps.service';

describe('KeyMapsService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: KeyMapsService = TestBed.get(KeyMapsService);
		expect(service).toBeTruthy();
	});
});
