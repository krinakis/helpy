import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RunnerPage} from './runner';

@NgModule({
    declarations: [
        RunnerPage,
    ],
    imports     : [
        IonicPageModule.forChild(RunnerPage),
    ],
    exports     : [
        RunnerPage
    ]
})
export class RunnerPageModule {
}
