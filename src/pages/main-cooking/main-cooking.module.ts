import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainCookingPage } from './main-cooking';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@NgModule({
  declarations: [
    MainCookingPage,
  ],
  imports: [
    IonicPageModule.forChild(MainCookingPage),
    WizardLayout2Module
  ],
})
export class MainCookingPageModule { }
