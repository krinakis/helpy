import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
//import {ComponentsModule} from '../../components/components.module';
import {Editprofile} from './editprofile';

@NgModule({
    declarations: [
        Editprofile,
    ],
    imports     : [
        IonicPageModule.forChild(Editprofile),
        //ComponentsModule,
    ],
    exports     : [
        Editprofile
    ]
})
export class EditprofileModule {
}
