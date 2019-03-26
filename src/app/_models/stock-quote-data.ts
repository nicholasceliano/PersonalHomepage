export class StockQuoteData {
    public stockName: string;
    public stockQty: number;
    public lastStockVal: number;
    public lastPriceVal: number;
    public lastPriceDate: Date;
    public currStockVal: number;
    public currPriceVal: number;
    public currPriceDate: Date;
    public priceDiffPercent: number;
    public dateDiff: string;
}
