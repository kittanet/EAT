import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CookingPage } from './cooking';

@NgModule({
  declarations: [
    CookingPage,
  ],
  imports: [
    IonicPageModule.forChild(CookingPage),
  ],
})
export class CookingPageModule { }
