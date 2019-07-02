import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { MarketService } from 'src/app/core/services/market.service';
import { Stock } from 'src/app/core/models/stock';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public user = new User();
    public hide = true;

    constructor(
        private market: MarketService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        const me = this;

        me.getStocksNames();
    }

    getStocksNames() {
        const me = this;

        me.market.getAllNames().subscribe((res) => {
            me.user.stocks = res;
        });
    }

    signup() {
        const me = this;

        me.authService.register(me.user).subscribe((res) => {
            if (res.status === 201) {
                me.router.navigate(['/login']);
            }
        });
    }

}
