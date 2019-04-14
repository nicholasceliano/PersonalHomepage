import { TestBed } from '@angular/core/testing';
import { VideoPlayerPanel } from './video-player-panel';

describe('VideoPlayerPanel', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: VideoPlayerPanel = TestBed.get(VideoPlayerPanel);
		expect(service).toBeTruthy();
	});
});
