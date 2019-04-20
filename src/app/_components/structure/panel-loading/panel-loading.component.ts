import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-panel-loading',
	templateUrl: './panel-loading.component.html',
	styleUrls: ['./panel-loading.component.css']
})
export class PanelLoadingComponent {
	@Input() isPanelLoaded: boolean;
	@Input() paddingValue = 5;

	constructor() { }
}
