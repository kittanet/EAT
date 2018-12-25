import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFavoritePage } from './my-favorite';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@NgModule({
  declarations: [
    MyFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(MyFavoritePage),
    WizardLayout2Module
  ],
})
export class MyFavoritePageModule {}
