import { TestBed } from '@angular/core/testing';

import { TwitchChatService } from './twitch-chat.service';

describe('TwitchChatService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TwitchChatService = TestBed.get(TwitchChatService);
		expect(service).toBeTruthy();
	});
});
