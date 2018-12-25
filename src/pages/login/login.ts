import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { ItemsPage } from '../../pages/items/items';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  params: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.params.data = {
      "username": "Email",
      "password": "Password",
      "register": "Register",
      "login": "เข้าสู่ระบบ",
      "skip": "SKIP",
      "backgroundImage": "assets/images/bg/bgContent.png",
      "logo": "assets/images/bg/iconLogin.png"

    };

    this.params.events = {
      onLogin: function (params) {
        console.log("onLogin");
        navCtrl.setRoot("AdsPage");
      },
      onRegister: function (params) {
        console.log("onRegister");
        navCtrl.setRoot("RegisterPage");
      },
      onSkip: function (params) {
        console.log("onSkip");
        navCtrl.setRoot("HomePage");
      },
      onFacebook: function (params) {
        console.log("onFacebook");
      },
      onTwitter: function (params) {
        console.log("onTwitter");
      },
      onGoogle: function (params) {
        console.log("onGoogle");
      },
      onPinterest: function (params) {
        console.log("onGoogle");
      },
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openRegisterPage() {
    //this.navCtrl.push(HomePage);
    //this.navCtrl.setRoot("HomePage");
    this.navCtrl.push(RegisterPage);
  }

  openMainPage() {
    //this.navCtrl.push(HomePage);
    //this.navCtrl.setRoot("HomePage");
    this.navCtrl.setRoot(ItemsPage);
  }

}
