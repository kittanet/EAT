import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePinPage } from './profile-pin';

@NgModule({
  declarations: [
    ProfilePinPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePinPage),
  ],
})
export class ProfilePinPageModule {}
