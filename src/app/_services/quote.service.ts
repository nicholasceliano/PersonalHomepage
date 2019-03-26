import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../_models/apiresponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockQuoteData } from '../_models/stock-quote-data';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  GetStockQuoteData(): Observable<APIResponse<StockQuoteData[]>> {
    return this.http.get<APIResponse<StockQuoteData[]>>(`${environment.apiEndpoint}/currency/stockQuoteData`);
  }
}
