import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MassagePage} from './massage';

@NgModule({
    declarations: [
        MassagePage,
    ],
    imports     : [
        IonicPageModule.forChild(MassagePage),
    ],
    exports     : [
        MassagePage
    ]
})
export class MassagePageModule {
}
