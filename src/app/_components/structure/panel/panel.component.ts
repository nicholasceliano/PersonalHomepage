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

	refreshPanel() {
		this.panel.refreshPanel();
		$('[panelname="' + this.panelName + '"]').find('.refresh-icon').addClass('rotateIcon')
				.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd msAnimationEnd animationend', () => {
			$(this).removeClass('rotateIcon');
		});
	}
}
