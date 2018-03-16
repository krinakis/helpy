import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {aboutHelpy} from './aboutHelpy';

@NgModule({
    declarations: [
        aboutHelpy,
    ],
    imports     : [
        IonicPageModule.forChild(aboutHelpy),
    ],
    exports     : [
        aboutHelpy
    ]
})
export class aboutHelpyModule {
}
