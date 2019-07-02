import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DashboardService } from '../core/services/dashboard.service';
import { User } from '../core/models/user';
import { Stock } from '../core/models/stock';
import { AuthService } from '../core/services/auth.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public user: User;
    public stocks: Stock[];
    public wallet: Stock[];
    public socketUrl: string;
    public socket;
    public amount: number;
    public bsModalRef: BsModalRef;

    @ViewChild('confirmTransactionTitle') confirmTransactionTitle: TemplateRef<any>;
    @ViewChild('confirmTransactionContent') confirmTransactionContent: TemplateRef<any>;
    @ViewChild('confirmTransactionSubmit') confirmTransactionSubmit: TemplateRef<any>;
    @ViewChild('confirmTransactionCancel') confirmTransactionCancel: TemplateRef<any>;


    constructor(
        private dashboardService: DashboardService,
        private modalService: BsModalService,
        private authService: AuthService
    ) {
        this.socketUrl = environment.api.webSocket;
    }

    ngOnInit() {
        const me = this;

        me.socket = webSocket(me.socketUrl);

        me.stocksLive();
        me.getUser();
        me.getStocks();
    }

    getUser() {
        const me = this;

        me.dashboardService.getUser().subscribe((res) => {
            me.user = res;
        });
    }

    getStocks() {
        const me = this;

        me.dashboardService.getStocks().subscribe((res) => {
            me.stocks = res;
            me.wallet = me.stocks.filter(stock => stock.amount > 0);
        });
    }

    stocksLive() {
        const me = this;

        me.socket.subscribe((data) => {
            me.stocks = data.map(stock => (new Stock()).fromJson(stock));
            me.updateWallet();
        }, (err) => {
            console.error(err);
        });
    }

    updateWallet() {
        const me = this;

        me.wallet.forEach((walletItem) => {
            me.stocks.forEach((stock) => {
                if (walletItem.id === stock.id) {
                    walletItem.price = stock.price;
                }
            });
        });
    }

    buy(stock: Stock) {
        const me = this;

        const initialState = { unit: stock.unit, price: stock.price, name: stock.name };

        me.bsModalRef = me.modalService.show(ConfirmModalComponent, { initialState });
        me.bsModalRef.content.modalTitle = me.confirmTransactionTitle;
        me.bsModalRef.content.modalContent = me.confirmTransactionContent;
        me.bsModalRef.content.modalConfirm = me.confirmTransactionSubmit;
        me.bsModalRef.content.modalCancel = me.confirmTransactionCancel;

        const subscriber = me.modalService.onHide.subscribe(() => {
            subscriber.unsubscribe();

            // TODO: Implement buy option

            if (me.bsModalRef.content.confirmed) {
                me.dashboardService.buy(stock, me.bsModalRef.content.boughtAmount).subscribe((res) => {
                    // Handle response
                });
            }
        });
    }

    // TODO: Implement sell option

    logout() {
        const me = this;

        me.authService.logout();
    }
}


