import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public hide = true;
    data: any = {};

    @ViewChild('loginForm') loginForm: NgForm;

    constructor(
        private authService: AuthService,
        private router: Router,
        private loader: NgxUiLoaderService,
    ) { }

    ngOnInit() {
    }

    signin() {
        const me = this;

        me.authService.login(me.data.login, me.data.password).subscribe((res) => {
            if (res.status === 200) {
                const redirect = me.authService.redirectUrl ? me.router.parseUrl(me.authService.redirectUrl) : '/';
                me.router.navigateByUrl(redirect);
            }
        });
    }

}
