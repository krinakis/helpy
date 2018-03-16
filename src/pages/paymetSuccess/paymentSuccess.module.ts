import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PaymentSuccess} from './paymentSuccess';

@NgModule({
    declarations: [
        PaymentSuccess,
    ],
    imports     : [
        IonicPageModule.forChild(PaymentSuccess),
    ],
    exports     : [
        PaymentSuccess
    ]
})
export class PaymentSuccessModule {
}
