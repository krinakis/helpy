import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ShopListPage} from "./shoplist";

@NgModule({
    declarations: [
        ShopListPage,
    ],
    imports     : [
        IonicPageModule.forChild(ShopListPage),
    ],
    exports     : [
        ShopListPage
    ]
})
export class ShopListPageModule {
}
