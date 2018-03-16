import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AutoPage} from './auto';

@NgModule({
    declarations: [
        AutoPage,
    ],
    imports     : [
        IonicPageModule.forChild(AutoPage),
    ],
    exports     : [
        AutoPage
    ]
})
export class AutoPageModule {
}
