import { IonicPageModule } from 'ionic-angular';
import { BlankPage } from './blank';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExpandableLayout2Module } from '../../components/list-view/expandable/layout-2/expandable-layout-2.module';
@NgModule({
  declarations: [
    BlankPage,
  ],
  imports: [
    IonicPageModule.forChild(BlankPage),
    ExpandableLayout2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlankPageModule {}
