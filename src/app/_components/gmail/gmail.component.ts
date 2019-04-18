import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../../_services/provider/google.service';
import { OAuthUrlResponse } from '../../_models/oauth-url-response';
import { GmailThread } from '../../_models/gmail-thread';
import { finalize, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GmailService } from '../../_services/gmail.service';
import { AlertsService } from '../../_services/alerts.service';
import { GrowingArrayAlertCountStrategy } from '../../_logic/AlertCountStrategy/growing-array';
import { OAuthPanel } from 'src/app/_logic/panel/oauth-panel';

@Component({
	selector: 'app-gmail',
	templateUrl: './gmail.component.html',
	styleUrls: ['./gmail.component.css']
})
export class GmailComponent extends OAuthPanel {

	constructor(
		private gmailService: GmailService,
		private googleService: GoogleService,
		private alertsService: AlertsService) {
			super(environment.mailPanelRefreshTime);
		}

	public isPanelLoaded = false;
	public unreadThreads: GmailThread[];

	protected refreshPanel() {
		const googleUserAuthUID = this.googleService.GetUserAuthUID();

		if (this.googleService.isValidAuthUID(googleUserAuthUID)) {
			this.gmailService.GetUnreadEmails().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res) => {
				this.panelAuthenticated = true;
				this.unreadThreads = this.alertsService.checkAlerts('Gmail Email', new GrowingArrayAlertCountStrategy(),
																	this.unreadThreads, res, this.isPanelLoaded);
			});
		} else {
			this.failedAuthentication();
		}
	}

	protected failedAuthentication() {
		super.failedAuthentication();
		this.unreadThreads = [];
		this.googleService.GetOAuth2SignInUrl().pipe(finalize(() => this.isPanelLoaded = true)).subscribe((res: OAuthUrlResponse) => {
			this.signInUrl = res.url;
		});
	}
}
