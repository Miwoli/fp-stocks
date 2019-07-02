import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock } from '../models/stock';

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    private baseUrl: string;

    constructor(
    private http: HttpClient
    ) {
        this.baseUrl = environment.api.url + '/api/market';
    }

    getAllNames(): Observable<Stock[]> {
    const me = this;

    return me.http.get<any>(me.baseUrl, { observe: 'response' })
            .pipe(map(response => {
                return response.body.map(stock => (new Stock()).fromJson(stock));
            }));
    }
}
