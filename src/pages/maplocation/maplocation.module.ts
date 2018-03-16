import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MaplocationPage} from './maplocation';

@NgModule({
    declarations: [
        // MaplocationPage,
    ],
    imports     : [
        IonicPageModule.forChild(MaplocationPage),
    ],
    exports     : [
        // MaplocationPage
    ]
})
export class MaplocationPageModule {
}
