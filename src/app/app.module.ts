import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './_components/app-routing.module';
import { AppComponent } from './_components/app.component';
import { YoutubeComponent } from './_components/youtube/youtube.component';
import { QuotesComponent } from './_components/quotes/quotes.component';
import { TwitchComponent } from './_components/twitch/twitch.component';

import { PanelComponent } from './_components/structure/panel/panel.component';
import { TwitchAuthComponent } from './_components/apiAuth/twitch-auth/twitch-auth.component';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { GmailComponent } from './_components/gmail/gmail.component';
import { GoogleAuthComponent } from './_components/apiAuth/google-auth/google-auth.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './_components/errors/page-not-found/page-not-found.component';
import { WeatherComponent } from './_components/weather/weather.component';
import { OAuthErrorComponent } from './_components/errors/oauth-error/oauth-error.component';
import { OcticonDirective } from './_directives/octicon.directive';
import { APIMiddlewareInterceptor } from './_interceptors/apimiddleware.interceptor';
import { GuitarTabsComponent } from './_components/guitar-tabs/guitar-tabs.component';
import { MatDialogModule } from '@angular/material';
import { FileDialogComponent } from './_components/structure/file-dialog/file-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsDialogComponent } from './_components/structure/settings-dialog/settings-dialog.component';
import { LowerCaseUrlSerializer } from './_logic/utility/lower-case-url-serializer';
import { ThemeItemDirective } from './_directives/theme-item.directive';
import { HtmlEntitiyDecodePipe } from './_pipes/html-entitiy-decode.pipe';

const appRoutes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'twitchauth', component: TwitchAuthComponent },
	{ path: 'googleauth', component: GoogleAuthComponent },
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
		FileDialogComponent,
		SettingsDialogComponent,
		ThemeItemDirective,
		HtmlEntitiyDecodePipe
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
		{
			provide: UrlSerializer,
			useClass: LowerCaseUrlSerializer
		},
		CookieService
	],
	bootstrap: [AppComponent],
	entryComponents: [
		FileDialogComponent,
		SettingsDialogComponent
	]
})
export class AppModule { }
