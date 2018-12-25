import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyHealthyChoicePage } from './my-healthy-choice';

@NgModule({
  declarations: [
    MyHealthyChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(MyHealthyChoicePage),
  ],
})
export class MyHealthyChoicePageModule {}
