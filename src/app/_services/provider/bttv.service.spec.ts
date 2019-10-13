import { TestBed } from '@angular/core/testing';

import { BTTVService } from './bttv.service';

describe('BTTVService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: BTTVService = TestBed.get(BTTVService);
		expect(service).toBeTruthy();
	});
});
