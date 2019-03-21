import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TwitchService } from 'src/app/_services/twitch.service';
import { ApiHelperService } from 'src/app/_services/utility/api-helper.service';

@Component({
  selector: 'app-twitch-auth',
  templateUrl: './twitch-auth.component.html',
  styleUrls: ['./twitch-auth.component.css']
})
export class TwitchAuthComponent implements OnInit {

  constructor(private router: Router,
    private twitch: TwitchService,
    private route: ActivatedRoute,
    private apiHelper: ApiHelperService) { 

      this.route.fragment.subscribe(fragment => {
        this.token = this.apiHelper.parseUrlFragmentToQueryParameterDict(fragment)["access_token"]
    });
  }

  private token: string;
  ngOnInit() {
    //TODO: move this to server - Immediatley revoke token. Don't need to use API, just need twitch OAuth loaded
    this.twitch.revokeAuthentication(this.token);
    this.router.navigate(['/']);
  }
}