import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-forget-password',
  templateUrl: 'profile-forget-password.html',
})
export class ProfileForgetPasswordPage {

  email: string;
  forget: any;

  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public navParams: NavParams,
    public http: HttpClient,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  goLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

  alertErrMsg(txt:string) {
    let alert = this.alertCtrl.create({
      title: 'กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง',
      subTitle: txt,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  sendForgetPassword(){
    let link = this.api.url+':'+this.api.port+'/sec/forgotPassword?email='+this.email;
    console.log("link: "+link);
    //alert(link);
    let myData = JSON.stringify({
      //email: this.username,
      //passwd: this.password
    });
    console.log(myData);
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};

    this.http.post(link, myData, headers)
    .subscribe(data => {
      console.log('>> my data: ', data);
      this.forget = data;
      console.log(data);
      if(this.forget.status.code=="0"){
        this.navCtrl.setRoot('LoginPage');
      }else{
        this.alertErrMsg("ไม่พบอีเมล์นี้ในระบบ กรุณาตรวจสอบอีเมล์ให้ถูกต้อง");
      }
    }, error => {
      console.log("Oooops!");
    });
  }

}
