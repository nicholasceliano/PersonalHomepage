// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oauthEndpoint: "http://localhost:3000/oauth",
  apiEndpoint: "http://localhost:3000/oauth",
  oauthCookiesName: {
    google: "googleAuthUID"
  },
  test: "",
  twitchAuthUri:"https://id.twitch.tv/oauth2",//TODO: This is temporary - Need to move all the twitch oAuth to server
  twitchAPIv5Uri:"https://api.twitch.tv/kraken",
  twitchClientId:"x15tbpitfdkjhoiotp5mdivv7ukq5n",
  twitchRedirectUri:"http://localhost:4200/twitchAuth"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
