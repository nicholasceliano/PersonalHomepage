import { TestBed } from '@angular/core/testing';
import { RefreshPanel } from './refresh-panel';

describe('RefreshPanel', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: RefreshPanel = TestBed.get(RefreshPanel);
		expect(service).toBeTruthy();
	});
});
