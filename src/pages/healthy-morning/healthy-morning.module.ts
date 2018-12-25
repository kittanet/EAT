import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyMorningPage } from './healthy-morning';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@NgModule({
  declarations: [
    HealthyMorningPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyMorningPage),
    WizardLayout2Module
  ],
})
export class HealthyMorningPageModule { }
