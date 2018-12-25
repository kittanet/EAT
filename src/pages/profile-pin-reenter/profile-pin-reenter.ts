import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the ProfilePinReenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-pin-reenter',
  templateUrl: 'profile-pin-reenter.html',
})
export class ProfilePinReenterPage {

  pin:string;
  count:number;
  click1:string;
  click2:string;
  click3:string;
  click4:string;
  click5:string;
  click6:string;

  username:string;
  password:string;
  oldPin:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public api: ApiProvider) {
    console.log("username: "+navParams.get('username'));
    console.log("pin: "+navParams.get('pin'));
    this.username = navParams.get('username');
    this.password = navParams.get('password');
    this.oldPin = navParams.get('pin');
    this.init();
    this.api.backPage(navCtrl, "ProfilePinReenterPage");
  }

  ionViewDidLoad() {
    this.init();
    console.log('ionViewDidLoad ProfilePinReenterPage');
  }

  init(){
    this.pin = "";
    this.count = 0;
    this.click1 = "radio-button-off";
    this.click2 = "radio-button-off";
    this.click3 = "radio-button-off";
    this.click4 = "radio-button-off";
    this.click5 = "radio-button-off";
    this.click6 = "radio-button-off";
  }

  clearPin(){
    this.init();
  }

  delPin(){
    if(this.count > 0){
      this.unclick();
      this.count--;
      this.pin = this.pin.substring(0, this.count);
    }
  }

  addPin(val:string){
    this.count++;
    console.log("count: "+this.count);
    this.click();
    this.pin += val;
    console.log("pin: "+this.pin);
    if(this.count==6){
      if(this.oldPin==this.pin){
        console.log("OK");
        localStorage.setItem('pin_'+this.username, this.pin);
        localStorage.setItem('active_pin', this.username);
        localStorage.setItem('active_pass', this.password);
        this.presentAlertOK();
        this.navCtrl.setRoot('MenuPage');
      }else{
        console.log("FAIL");
        this.presentAlert();
        this.init();
      }
    }
  }

  unclick(){
    switch(this.count) {
      case 1:{
        this.click1 = "radio-button-off";
        break;
      }
      case 2:{
        this.click2 = "radio-button-off";
        break;
      }
      case 3:{
        this.click3 = "radio-button-off";
        break;
      }
      case 4:{
        this.click4 = "radio-button-off";
        break;
      }
      case 5:{
        this.click5 = "radio-button-off";
        break;
      }
      case 6:{
        this.click6 = "radio-button-off";
        break;
      }
      default: {
        this.init();
        break;
      }
    }
  }

  click(){
    switch(this.count) {
      case 1:{
        this.click1 = "radio-button-on";
        break;
      }
      case 2:{
        this.click2 = "radio-button-on";
        break;
      }
      case 3:{
        this.click3 = "radio-button-on";
        break;
      }
      case 4:{
        this.click4 = "radio-button-on";
        break;
      }
      case 5:{
        this.click5 = "radio-button-on";
        break;
      }
      case 6:{
        this.click6 = "radio-button-on";
        break;
      }
      default: {
        this.init();
        break;
      }
    }
  }

  goPinEnter(){
    this.navCtrl.setRoot('ProfilePinEnterPage', {'username': this.username, 'password': this.password});
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน PIN ไม่ถูกต้อง',
      message: 'กรุณาตรวจสอบ PIN ของท่านอีกครั้ง',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  presentAlertOK() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน PIN ถูกต้อง',
      message: 'ขอบคุณสำหรับการตั้งค่า',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  goHome(){
    this.navCtrl.setRoot("MenuPage");
  }

}
