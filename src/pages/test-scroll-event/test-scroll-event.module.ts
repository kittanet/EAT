import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestScrollEventPage } from './test-scroll-event';

@NgModule({
  declarations: [
    TestScrollEventPage,
  ],
  imports: [
    IonicPageModule.forChild(TestScrollEventPage),
  ],
})
export class TestScrollEventPageModule {}
