import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {resetPwd} from './resetPwd';

@NgModule({
    declarations: [
        resetPwd,
    ],
    imports     : [
        IonicPageModule.forChild(resetPwd),
    ],
    exports     : [
        resetPwd
    ]
})
export class resetPwdModule {
}
