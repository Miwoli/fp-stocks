import { Component, OnInit, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
    public confirmed = false;
    @Input() unit: number;
    @Input() price: number;
    @Input() name: string;

    public boughtAmount: number;

    public amount;

    modalTitle: TemplateRef<any>;
    modalContent: TemplateRef<any>;
    modalCancel: TemplateRef<any>;
    modalSubmit: TemplateRef<any>;

    constructor(
        private bsModalRef: BsModalRef
    ) { }

    confirm() {
        const me = this;

        me.boughtAmount = me.amount;
        me.confirmed = true;
        me.bsModalRef.hide();
    }

    cancel() {
        const me = this;

        me.bsModalRef.hide();
    }

}
