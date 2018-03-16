import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShopDetailsPage} from "./shopdetails";

@NgModule({
    declarations: [
        ShopDetailsPage,
    ],
    imports     : [
        IonicPageModule.forChild(ShopDetailsPage),
    ],
    exports     : [
        ShopDetailsPage
    ]
})
export class ShopDetailsPageModule {
}
