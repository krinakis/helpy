import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {helpCenter} from './helpCenter';

@NgModule({
    declarations: [
        helpCenter,
    ],
    imports     : [
        IonicPageModule.forChild(helpCenter),
    ],
    exports     : [
        helpCenter
    ]
})
export class helpCenterModule {
}
