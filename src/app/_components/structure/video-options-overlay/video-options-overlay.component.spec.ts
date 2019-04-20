import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOptionsOverlayComponent } from './video-options-overlay.component';

describe('VideoOptionsComponent', () => {
	let component: VideoOptionsOverlayComponent;
	let fixture: ComponentFixture<VideoOptionsOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VideoOptionsOverlayComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VideoOptionsOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
