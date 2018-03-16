import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Cancel} from './cancel';

@NgModule({
    declarations: [
        Cancel,
    ],
    imports     : [
        IonicPageModule.forChild(Cancel),
    ],
    exports     : [
        Cancel
    ]
})
export class CancelModule {
}
