import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-twitch-auth',
  templateUrl: './twitch-auth.component.html',
  styleUrls: ['./twitch-auth.component.css']
})
export class TwitchAuthComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {

    //need to get the token stuff and set it to a variable or  cookie?
    console.log(window.location.href)
    console.log("need to handle twitch api response")

    
    this.router.navigate(['/']);

  }

  

}
