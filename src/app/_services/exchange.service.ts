import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Exchange } from '@/_models/exchange';
import {ExchangeResponse} from '@/_models/exchangeResponse';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ExchangeService{
    constructor(private http: HttpClient) { }

    getExchange(exchange: Exchange) {
        return this.http.get<string>(`${environment.apiUrl}/channel/exchange/v1/exchange/findexchange/`+exchange.from+'/'+exchange.to);
    }

    updateExchange(exchange: Exchange) {
        return this.http.post(`${environment.apiUrl}/channel/exchange/v1/exchange/updateexchange`,exchange);
    }

    executeExchange(exchange: Exchange) {
        return this.http.post<ExchangeResponse>(`${environment.apiUrl}/channel/exchange/v1/exchange/executeexchange`,exchange);
    }

}