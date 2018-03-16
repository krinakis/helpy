import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {setting} from './setting';

@NgModule({
    declarations: [
        setting,
    ],
    imports     : [
        IonicPageModule.forChild(setting),
    ],
    exports     : [
        setting
    ]
})
export class settingModule {
}
