import { TestBed } from '@angular/core/testing';

import { APIMiddlewareInterceptor } from './apimiddleware.interceptor';

describe('APIMiddlewareInterceptor', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: APIMiddlewareInterceptor = TestBed.get(APIMiddlewareInterceptor);
		expect(service).toBeTruthy();
	});
});
