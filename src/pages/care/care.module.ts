import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CarePage} from './care';

@NgModule({
    declarations: [
        CarePage,
    ],
    imports     : [
        IonicPageModule.forChild(CarePage),
    ],
    exports     : [
        CarePage
    ]
})
export class CarePageModule {
}
