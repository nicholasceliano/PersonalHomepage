import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLoadingComponent } from './panel-loading.component';

describe('PanelLoadingComponent', () => {
	let component: PanelLoadingComponent;
	let fixture: ComponentFixture<PanelLoadingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PanelLoadingComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PanelLoadingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
