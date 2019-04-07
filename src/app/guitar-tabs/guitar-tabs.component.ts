import { Component, OnInit } from '@angular/core';
import { GuitarTabsService } from '../_services/guitar-tabs.service';

@Component({
	selector: 'app-guitar-tabs',
	templateUrl: './guitar-tabs.component.html',
	styleUrls: ['./guitar-tabs.component.css']
})
export class GuitarTabsComponent implements OnInit {

	constructor(private gts: GuitarTabsService) { }

	ngOnInit() {
		this.getGuitarTabs()
	}

	private getGuitarTabs() {
		this.gts.getGuitarTabs().subscribe((res) => {
			console.log(res);

		});
	}

	openGuitarTab() {
		this.gts.openGuitarTab(1).subscribe((res) => {

			//then i need to display the html

		})
	}



}
