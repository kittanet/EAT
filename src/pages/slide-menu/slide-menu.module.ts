import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideMenuPage } from './slide-menu';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@NgModule({
  declarations: [
    SlideMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SlideMenuPage),
    WizardLayout2Module
  ],
})
export class SlideMenuPageModule { }
