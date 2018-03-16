import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {orderInfo} from './orderInfo';

@NgModule({
    declarations: [
        orderInfo,
    ],
    imports     : [
        IonicPageModule.forChild(orderInfo),
    ],
    exports     : [
        orderInfo
    ]
})
export class orderInfoModule {
}
