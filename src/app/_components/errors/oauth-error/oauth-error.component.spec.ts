import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthErrorComponent } from './oauth-error.component';

describe('OAuthErrorComponent', () => {
	let component: OAuthErrorComponent;
	let fixture: ComponentFixture<OAuthErrorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OAuthErrorComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OAuthErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
