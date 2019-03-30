import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchAuthComponent } from './twitch-auth.component';

describe('TwitchAuthComponent', () => {
	let component: TwitchAuthComponent;
	let fixture: ComponentFixture<TwitchAuthComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TwitchAuthComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TwitchAuthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
