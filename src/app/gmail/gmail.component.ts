import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../_services/provider/google.service';
import { OAuthUrlResponse } from '../_models/oauth-url-response';
import { GmailThread } from '../_models/gmail-thread';
import { finalize, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GmailService } from '../_services/gmail.service';
import { PanelRefreshService } from '../_services/panel/panel-refresh.service';


@Component({
	selector: 'app-gmail',
	templateUrl: './gmail.component.html',
	styleUrls: ['./gmail.component.css']
})
export class GmailComponent extends PanelRefreshService {

	constructor(
		private gmailService: GmailService,
		private googleService: GoogleService) {
			super(environment.mailPanelRefreshTime);
		}

	public isPanelLoaded = false;
	public signInUrl: string;
	public googleAuthenicated = false;
	public unreadThreads: GmailThread[];

	authenticate() {
		window.location.href = this.signInUrl;
	}

	protected refreshPanel() {
		const googleUserAuthUID = this.googleService.GetUserAuthUID();

		if (googleUserAuthUID && googleUserAuthUID.length === 36) {
			this.gmailService.GetUnreadEmails().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				this.googleAuthenicated = true;

				if (JSON.stringify(this.unreadThreads) !== JSON.stringify(res)) {
					this.unreadThreads = this.checkAlerts(this.unreadThreads, res);
				}
			});
		} else {
			this.failedAuthentication();
		}
	}

	private failedAuthentication() {
		this.googleAuthenicated = false;
		this.unreadThreads = [];
		this.googleService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}
}
