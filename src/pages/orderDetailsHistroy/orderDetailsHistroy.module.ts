import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {orderDetailsHistroy} from './orderDetailsHistroy';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
    declarations: [
        orderDetailsHistroy,
    ],
    imports     : [
        IonicPageModule.forChild(orderDetailsHistroy),
        Ionic2RatingModule
    ],
    exports     : [
        orderDetailsHistroy
    ]
})
export class orderDetailsHistroyModule {
}
