import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShopItemAdd} from "./shopitemadd";

@NgModule({
    declarations: [
        ShopItemAdd,
    ],
    imports     : [
        IonicPageModule.forChild(ShopItemAdd),
    ],
    exports     : [
        ShopItemAdd
    ]
})
export class ShopItemAddModule {
}
