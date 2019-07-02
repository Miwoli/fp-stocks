import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string;
    public redirectUrl: string;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.baseUrl = environment.api.url + '/auth';
    }

    login(login: string, password: string): Observable<any> {
        const me = this;

        return me.http.post(me.baseUrl + '/login', { login, password }, { observe: 'response' })
            .pipe(map((response) => {
                if (response.body) {
                    localStorage.setItem('token', JSON.stringify(response.body));
                }
                return response;
            }));
    }

    logout(): void {
        const me = this;

        localStorage.removeItem('token');
        me.router.navigate(['/login']);
    }

    register(user: User): Observable<any> {
        const me = this;

        return me.http.post(me.baseUrl + '/register', user.toJson(), { observe: 'response', responseType: 'text' as 'json' })
            .pipe(map((response) => response));
    }
}
