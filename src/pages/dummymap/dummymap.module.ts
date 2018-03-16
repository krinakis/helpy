import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DummymapPage } from './dummymap';

@NgModule({
  declarations: [
    DummymapPage,
  ],
  imports: [
    IonicPageModule.forChild(DummymapPage),
  ],
})
export class DummymapPageModule {}
