import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { QuotesComponent } from './quotes/quotes.component';
import { TwitchComponent } from './twitch/twitch.component';

import { PanelComponent } from './structure/panel/panel.component';
import { TwitchAuthComponent } from './apiAuth/twitch-auth/twitch-auth.component';
import { Routes, RouterModule } from '@angular/router';
import { GmailComponent } from './gmail/gmail.component';
import { GoogleAuthComponent } from './apiAuth/google-auth/google-auth.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { WeatherComponent } from './weather/weather.component';
import { OAuthErrorComponent } from './errors/oauth-error/oauth-error.component';
import { OcticonDirective } from './_directives/octicon.directive';
import { APIMiddlewareInterceptor } from './_interceptors/apimiddleware.interceptor';
import { GuitarTabsComponent } from './guitar-tabs/guitar-tabs.component';
import { MatDialogModule } from '@angular/material';
import { FileDialogComponent } from './structure/file-dialog/file-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'twitchAuth', component: TwitchAuthComponent },
	{ path: 'googleAuth', component: GoogleAuthComponent },
	{ path: 'oautherror', component: OAuthErrorComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		YoutubeComponent,
		QuotesComponent,
		PanelComponent,
		TwitchComponent,
		TwitchAuthComponent,
		GmailComponent,
		GoogleAuthComponent,
		DashboardComponent,
		PageNotFoundComponent,
		WeatherComponent,
		OAuthErrorComponent,
		OcticonDirective,
		GuitarTabsComponent,
		FileDialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: false } // <-- debugging purposes only
		),
		MatDialogModule,
		NoopAnimationsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIMiddlewareInterceptor,
			multi: true
		},
		CookieService
	],
	bootstrap: [AppComponent],
	entryComponents: [FileDialogComponent]
})
export class AppModule { }
