import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Stock } from '../models/stock';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private baseUrl: string;

    constructor(
        private http: HttpClient,
    ) {
        this.baseUrl = environment.api.url + '/api';

    }

    getUser(): Observable<User> {
        const me = this;

        return me.http.get(me.baseUrl + '/users', { observe: 'response' })
            .pipe(map((response) => {
                return ((new User()).fromJson(response.body));
            }));
    }

    getStocks(): Observable<Stock[]> {
        const me = this;

        return me.http.get<any>(me.baseUrl + '/stocks', { observe: 'response' })
            .pipe(map((response) => {
                return response.body.map((stock) => {
                    const temp = new Stock().fromJson(stock.stock);
                    temp.amount = stock.amount;
                    return temp;
                });
            }));
    }

    // TODO: Finish buy, and add sell

    buy(stock: Stock, amount: number): Observable<any> {
        const me = this;

        return me.http.post(me.baseUrl + '/stocks/buy', { observe: 'response' })
            .pipe(map((response) => {
                return response;
            }));
    }
}
