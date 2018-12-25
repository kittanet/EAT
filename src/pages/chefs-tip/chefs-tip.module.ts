import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChefsTipPage } from './chefs-tip';

@NgModule({
  declarations: [
    ChefsTipPage,
  ],
  imports: [
    IonicPageModule.forChild(ChefsTipPage),
  ],
})
export class ChefsTipPageModule { }
