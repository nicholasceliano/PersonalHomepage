import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {

  private googleAuthUID: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService) { 
    this.route.queryParamMap.subscribe(params => {
      this.googleAuthUID = params.get("uid");
    });
  }

  ngOnInit() {
    this.cookie.set("googleAuthUID",this.googleAuthUID)
    this.router.navigate(['/']);
  }
}
