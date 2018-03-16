import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BeautyPage} from './beauty';

@NgModule({
    declarations: [
        BeautyPage,
    ],
    imports     : [
        IonicPageModule.forChild(BeautyPage),
    ],
    exports     : [
        BeautyPage
    ]
})
export class BeautyPageModule {
}
