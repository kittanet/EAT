import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ProfilePinSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-pin-setting',
  templateUrl: 'profile-pin-setting.html',
})
export class ProfilePinSettingPage {

  username: string;
  password: string;
  login: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public api: ApiProvider,
              private alertCtrl: AlertController) {
    this.init();
    this.api.backPage(navCtrl, "ProfilePinSettingPage");
  }

  ionViewDidLoad() {
    this.init();
    console.log('ionViewDidLoad ProfilePinSettingPage');
  }

  init(){
    this.username = "";
    this.password = "";
  }

  onLogin(){
    let link = this.api.url+':'+this.api.port+'/sec/login?email='+this.username+'&passwd='+this.password;
    console.log("link: "+link);
    //alert(link);
    let myData = JSON.stringify({
      //email: this.username,
      //passwd: this.password
    });
    console.log(myData);
    let headers =  {headers: new  HttpHeaders({'Content-Type': 'application/json'})};
    this.http.post(link, myData, headers)
    .subscribe(data => {
      console.log('>> my data: ', data);
      this.login = data;
      console.log(data);
      console.log("status: "+this.login.status.code);
      if(this.login.status.code=="0"){
        this.navCtrl.setRoot('ProfilePinEnterPage', {'username': this.username, 'password': this.password});
      }else{
        this.presentAlert();
      }
    }, error => {
      console.log("Oooops!");
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถตั้งค่าได้',
      cssClass: 'popupOrange',
      subTitle: '<img src="assets/images/bg/warning.png">',
      message: 'กรุณาตรวจสอบ Username และ Password ของท่านอีกครั้ง',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  goHome(){
    this.navCtrl.setRoot("MenuPage");
  }

}
