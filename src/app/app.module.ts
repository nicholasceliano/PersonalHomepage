import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { QuotesComponent } from './quotes/quotes.component';
import { TwitchComponent } from './twitch/twitch.component';

import { PanelComponent } from './structure/panel/panel.component';
import { TwitchAuthComponent } from './apiAuth/twitch-auth/twitch-auth.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'twitchAuth', component: TwitchAuthComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    QuotesComponent,
    PanelComponent,
    TwitchComponent,
    TwitchAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
