import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-oauth-error',
	templateUrl: './oauth-error.component.html',
	styleUrls: ['./oauth-error.component.css']
})
export class OAuthErrorComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	errorMessage: string;
	oAuthService: string;

	ngOnInit() {
		const qpErrorMessage = this.route.snapshot.queryParamMap.get('e');
		const qpOAuthService = this.route.snapshot.queryParamMap.get('o');
		if (qpErrorMessage) {
			this.errorMessage = qpErrorMessage;
		}

		if (qpOAuthService) {
			this.oAuthService = qpOAuthService;
		}
	}
}
