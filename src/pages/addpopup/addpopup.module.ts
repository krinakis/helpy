import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Addpopup} from './addpopup';

@NgModule({
    declarations: [
        Addpopup,
    ],
    imports     : [
        IonicPageModule.forChild(Addpopup),
    ],
    exports     : [
        Addpopup
    ]
})
export class AddpopupModule {
}
