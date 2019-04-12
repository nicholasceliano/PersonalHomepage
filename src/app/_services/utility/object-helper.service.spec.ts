import { TestBed } from '@angular/core/testing';

import { ObjectHelperService } from './object-helper.service';

describe('ObjectHelperService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ObjectHelperService = TestBed.get(ObjectHelperService);
		expect(service).toBeTruthy();
	});
});
