import { TestBed } from '@angular/core/testing';

import { FrankerFaceZService } from './franker-face-z.service';

describe('FrankerFaceZService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: FrankerFaceZService = TestBed.get(FrankerFaceZService);
		expect(service).toBeTruthy();
	});
});
