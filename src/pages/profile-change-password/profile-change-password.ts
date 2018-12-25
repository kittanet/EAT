import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';

@IonicPage()
@Component({
  selector: 'page-profile-change-password',
  templateUrl: 'profile-change-password.html',
})
export class ProfileChangePasswordPage {

  oldPass: string;
  newPass: string;
  reNewPass: string;

  changePass: any;

  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public http: AuthHttp) {
    this.api.backPage(navCtrl, "ProfileChangePasswordPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  goHome(){
    this.navCtrl.setRoot('MenuPage');
  }

  alertErrMsg(txt:string) {
    let alert = this.alertCtrl.create({
      title: 'กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง',
      subTitle: txt,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  checkChange(){
    if(!this.oldPass){
      this.alertErrMsg("กรุณาใส่ รหัสปัจจุบัน");
      return;
    }else if(!this.newPass || !this.reNewPass){
      this.alertErrMsg("กรุณาใส่ รหัสใหม่");
      return;
    }else if(this.oldPass.length < 6 || this.newPass.length < 6 || this.reNewPass.length < 6){
      this.alertErrMsg("รหัสผ่านต้องมี 6 หลักขึ้นไป");
      return;
    }
    this.onChange();
  }

  onChange(){
    if(this.newPass != this.reNewPass){
      this.alertErrMsg("ยืนยันรหัสใหม่ไม่ถูกต้อง");
      return;
    }else{
      let link = this.api.url+':'+this.api.port+'/api/members/changePassword';
      let myData = JSON.stringify({
        passwd: this.oldPass,
        newPasswd: this.newPass
      });
      this.http.post(link, myData).map(res => res.json())
      .subscribe(data => {
        console.log("changePassword");
        console.log(data);
        this.changePass = data;
        if(this.changePass.status.code == "0"){
          this.navCtrl.setRoot('LoginPage');
        }else{
          this.alertErrMsg("รหัสผ่านไม่ถูกต้อง");
        }
      }, error => {
        console.log("Oooops!");
      });
    }
  }

}
