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
  
  public isPanelLoaded: boolean = false;
  public stockQuoteData: StockQuoteData[] = [];
  public currentStockVal: number;
  public pastStockVal: number;
  public currStockPercent: number;
  public mostRecentPriceDate: Date;
  public collapsed: boolean = false;

  constructor(private quotes: QuoteService) { }

  ngOnInit() {
    this.GetStockQuoteData();
  }

  toggleQuotePanelCollapse() {
    this.collapsed = this.collapseDiv.nativeElement.classList.contains('show')? false : true;
  }

  private GetStockQuoteData() {
    this.quotes.GetStockQuoteData().subscribe((res) => {
      this.stockQuoteData = res.data;
      this.currentStockVal = this.getSum('currStockVal');
      this.pastStockVal = this.getSum('lastStockVal');
      this.currStockPercent = ((this.currentStockVal - this.pastStockVal) / this.pastStockVal)
      this.mostRecentPriceDate = new Date(Math.max.apply(null, this.stockQuoteData.map(function(e) {
        return new Date(e.currPriceDate);
      })));
      this.isPanelLoaded = true;
    }, (err => console.log(err)));
  }

  private getSum(index: string) : number {
    let sum = 0;
    for(let i = 0; i < this.stockQuoteData.length; i++) {
      sum += this.stockQuoteData[i][index];
    }
    return sum;
  }
}
