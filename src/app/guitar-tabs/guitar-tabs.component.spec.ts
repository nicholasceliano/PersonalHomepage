import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarTabsComponent } from './guitar-tabs.component';

describe('GuitarTabsComponent', () => {
	let component: GuitarTabsComponent;
	let fixture: ComponentFixture<GuitarTabsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GuitarTabsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuitarTabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
