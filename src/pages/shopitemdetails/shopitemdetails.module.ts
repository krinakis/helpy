import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShopItemDetailsPage} from "./shopitemdetails";

@NgModule({
    declarations: [
        ShopItemDetailsPage,
    ],
    imports     : [
        IonicPageModule.forChild(ShopItemDetailsPage),
    ],
    exports     : [
        ShopItemDetailsPage
    ]
})
export class ShopItemDetailsPageModule {
}
