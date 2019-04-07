import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuoteService } from '../_services/quote.service';
import { StockQuoteData } from '../_models/stock-quote-data';

@Component({
	selector: 'app-quotes',
	templateUrl: './quotes.component.html',
	styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
	@ViewChild('collapseDiv') collapseDiv: ElementRef;

	public isPanelLoaded = false;
	public stockQuoteData: StockQuoteData[];
	public currentStockVal: number;
	public pastStockVal: number;
	public currStockPercent: number;
	public mostRecentPriceDate: Date;
	public collapsed = false;

	constructor(private quotes: QuoteService) { }

	ngOnInit() {
		this.GetStockQuoteData();
	}

	toggleQuotePanelCollapse() {
		this.collapsed = this.collapseDiv.nativeElement.classList.contains('show') ? false : true;
	}

	private GetStockQuoteData() {
		this.quotes.GetStockQuoteData().subscribe((res) => {
			this.stockQuoteData = res;

			this.currentStockVal = this.stockQuoteData ? this.getSum('currStockVal') : 0;
			this.pastStockVal = this.stockQuoteData ? this.getSum('lastStockVal') : 0;
			this.currStockPercent = ((this.currentStockVal - this.pastStockVal) / this.pastStockVal);
			if (this.stockQuoteData) {
				this.mostRecentPriceDate = new Date(Math.max.apply(null, this.stockQuoteData.map((e) => {
					return new Date(e.currPriceDate);
				})));
			}

			this.isPanelLoaded = true;
		});
	}

	private getSum(index: string): number {
		let sum = 0;
		for (const i of this.stockQuoteData) {
			sum += i[index];
		}
		return sum;
	}
}
