import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockQuoteData } from '../_models/stock-quote-data';

@Injectable({
	providedIn: 'root'
})
export class QuoteService {

	constructor(private http: HttpClient) { }

	GetStockQuoteData(): Observable<StockQuoteData[]> {
		return this.http.get<StockQuoteData[]>(`${environment.apiEndpoint}/currency/stockQuoteData`);
	}
}
