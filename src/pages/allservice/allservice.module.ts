import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Allservice} from './allservice';

@NgModule({
    declarations: [
        Allservice,
    ],
    imports     : [
        IonicPageModule.forChild(Allservice),
    ],
    exports     : [
        Allservice
    ]
})
export class AllserviceModule {
}
