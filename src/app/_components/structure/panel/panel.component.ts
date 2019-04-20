import { Component, Input, ViewChild } from '@angular/core';
import { RefreshPanel } from 'src/app/_logic/panel/refresh-panel';
import $ from 'jquery';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.css']
})

export class PanelComponent {
	// tslint:disable:no-input-rename
	@Input('panelName') panelName: string;
	@Input('panelTitle') panelTitle: string;
	@Input('panelLogo') panelLogo: string;
	@ViewChild('panel') panel: RefreshPanel;

	constructor() { }

	private rotateIconClass = 'rotateIcon';
	private refreshing = false;

	refreshPanel() {
		if (!this.refreshing) {
			this.refreshing = true;
			this.panel.refreshPanel();
		}
		
		const refreshIcon = $('[panelname="' + this.panelName + '"]').find('.refresh-icon');
		refreshIcon.addClass(this.rotateIconClass).one('animationend', () => {
			refreshIcon.removeClass(this.rotateIconClass);
			this.refreshing = false;
		});
	}
}
