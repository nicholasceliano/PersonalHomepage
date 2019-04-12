import { TestBed } from '@angular/core/testing';

import { PanelRefreshService } from './panel-refresh.service';

describe('PanelRefreshService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: PanelRefreshService = TestBed.get(PanelRefreshService);
		expect(service).toBeTruthy();
	});
});
