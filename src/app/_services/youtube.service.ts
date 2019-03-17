import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { WatchlistVideo } from '../_models/watchlist-video';
import { SubscriptionVideo } from '../_models/subscription-video';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private watchlistVideosUrl = 'api/youtube/watchlistVideos';
  private subscriptionVideosUrl = 'api/youtube/subscriptionVideos';

  getWatchlistVideos(): Observable<WatchlistVideo[]> {
    return this.http.get<WatchlistVideo[]>(this.watchlistVideosUrl);
  }

  getSubscriptionVideos(): Observable<SubscriptionVideo[]> {
    return this.http.get<SubscriptionVideo[]>(this.subscriptionVideosUrl);
  }   

//   Please <a href="#" id="login-link">authorize</a> to continue.

//   <script type="text/javascript">

//     var apiKey = '';
//     var discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
//     var clientId = '';
//     var scopes = 'https://www.googleapis.com/auth/youtube';
//     var authorizeButton = document.getElementById('authorize-button');
//     var signoutButton = document.getElementById('signout-button');
//     var GoogleAuth; 
//     function handleClientLoad() {
//       // Load the API client and auth2 library
//       gapi.load('client:auth2', initClient);
//     }
//     function initClient() {
//       gapi.client.init({
//           apiKey: apiKey,
//           discoveryDocs: discoveryDocs,
//           clientId: clientId,
//           scope: scopes
//       }).then(function (authResult) {
//         GoogleAuth = gapi.auth2.getAuthInstance();

//         GoogleAuth.isSignedIn.listen(updateSigninStatus);
//       }).catch(function (err) {
//     console.log(err);
//   });
// }

// var isAuthorized;
// var currentApiRequest;
// function sendAuthorizedApiRequest(requestDetails) {
//   currentApiRequest = requestDetails;
//   if (isAuthorized) {
//     // Make API request
//     var request = gapi.client.youtube.playlists.list({'part': 'snippet', 'mine': 'true'});

//    // Execute the API request.
//    request.execute(function(response) {
//      console.log(response);
//    });

//     // Reset currentApiRequest variable.
//     currentApiRequest = {};
//   } else {
//     GoogleAuth.signIn();
//   }
// }
// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     isAuthorized = true;
//     if (currentApiRequest) {
//       sendAuthorizedApiRequest(currentApiRequest);
//     }
//   } else {
//     isAuthorized = false;
//   }
// }

// function checkAuth() {
//   gapi.auth2.authorize({
//     client_id: clientId,
//     scope: scopes,
//     response_type: 'id_token permission'
//   }, handleAuthResult);
// }

// // Handle the result of a gapi.auth.authorize() call.
// function handleAuthResult(authResult) {
//   if (authResult && !authResult.error) {
//     // Authorization was successful. Hide authorization prompts and show
//     // content that should be visible after authorization succeeds.
//     $('.pre-auth').hide();
//     $('.post-auth').show();
//     loadAPIClientInterfaces();
//   } else {
//     // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
//     // client flow. The current function is called when that flow completes.
//     $('#login-link').click(function() {
//       gapi.auth2.authorize({
//         client_id: OAUTH2_CLIENT_ID,
//         scope: OAUTH2_SCOPES,
//         immediate: false
//         }, handleAuthResult);
//     });
//   }
// }

//   gapi.client.load("https://www.googleapis.com/discovery/v2/apis/youtube/v3/rest")
//   .then(function(test) {
//     var rq = {
//         part: 'id,contentDetails,subscriberSnippet,snippet',
//         mine: true,
//         maxResults: 50
//     };
    
//     var request = gapi.client.youtube.subscriptions.list(rq);
    
//     request.execute(function(response) {
//         console.log(response.items);
//     });
//   });
// }
 
//   </script>

// <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
}