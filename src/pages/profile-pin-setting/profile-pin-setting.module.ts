import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePinSettingPage } from './profile-pin-setting';

@NgModule({
  declarations: [
    ProfilePinSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePinSettingPage),
  ],
})
export class ProfilePinSettingPageModule {}
