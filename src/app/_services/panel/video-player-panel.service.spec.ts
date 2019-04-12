import { TestBed } from '@angular/core/testing';

import { VideoPlayerPanelService } from './video-player-panel.service';

describe('VideoPlayerPanelService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: VideoPlayerPanelService = TestBed.get(VideoPlayerPanelService);
		expect(service).toBeTruthy();
	});
});
