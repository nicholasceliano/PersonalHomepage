import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {
  // tslint:disable:no-input-rename
  @Input('panelName') panelName: string;
  @Input('panelTitle') panelTitle: string;
  @Input('panelLogo') panelLogo: string;

  constructor() {}

  ngOnInit() {
  }
}
