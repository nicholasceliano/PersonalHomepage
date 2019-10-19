import { TestBed } from '@angular/core/testing';

import { PiService } from './pi.service';

describe('PiService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: PiService = TestBed.get(PiService);
		expect(service).toBeTruthy();
	});
});
