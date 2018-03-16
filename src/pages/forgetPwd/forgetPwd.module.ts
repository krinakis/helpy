import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {forgetPwd} from './forgetPwd';

@NgModule({
    declarations: [
        forgetPwd,
    ],
    imports     : [
        IonicPageModule.forChild(forgetPwd),
    ],
    exports     : [
        forgetPwd
    ]
})
export class forgetPwdModule {
}
