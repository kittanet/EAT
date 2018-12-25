import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ProfilePinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-pin',
  templateUrl: 'profile-pin.html',
})
export class ProfilePinPage {

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

  result: Observable<any>;
  login: any;
  accessToken: any;

  banner: any;
  header: any;

  errCount:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              private authHttp: AuthHttp,
              public http: HttpClient,
              private alertCtrl: AlertController) {
    this.init();
    this.errCount = 0;
  }

  ionViewDidLoad() {
    this.init();
    this.errCount = 0;
    console.log('ionViewDidLoad ProfilePinPage');
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

  errMsg() {
    let alert = this.alertCtrl.create({
      title: 'เข้าใช้งานไม่สำเร็จ',
      subTitle: 'รหัส PIN ของท่านถูกล็อค กรุณาเข้าสู่ ระบบด้วย email',
      buttons: [
        {
          text: 'ตกลง',
          handler: data => {
            this.navCtrl.setRoot("LoginPage");
          }
        }
      ]
    });
    alert.present();
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
    if(this.errCount>2){
      console.log("errCount: "+this.errCount);
      this.errMsg();
      return;
    }
    this.count++;
    console.log("count: "+this.count);
    this.click();
    this.pin += val;
    console.log("pin: "+this.pin);
    if(this.count==6){
      if(localStorage.getItem('pin_'+localStorage.getItem('active_pin')) == this.pin){

        this.username = localStorage.getItem('active_pin');
        this.password = localStorage.getItem('active_pass')

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
             //alert("login ok");
             localStorage.setItem('access_token', this.login.data.access_token);
             localStorage.setItem('username', this.username);
             localStorage.setItem('password', this.password);


             this.result = this.authHttp.get(this.api.url+':'+this.api.port+'/api/banners').map(res => res.json());
             this.result
             .subscribe(data => {
               //alert("banners ok");
               console.log('>> my banners: ');
               this.banner = data;
               if(this.banner.status.code=="0"){
                 console.log(data);
                 this.api.banners = this.listBanner(this.banner.data);

                 this.result = this.authHttp.get(this.api.url+':'+this.api.port+'/api/headers').map(res => res.json());
                 this.result
                 .subscribe(data => {
                   console.log('>> my headers: ');
                   this.header = data;
                   if(this.header.status.code=="0"){
                     console.log(data);
                     this.api.headers = this.listBanner(this.header.data);
                     if(this.api.headers){
                        //setTimeout(() => {
                          localStorage.setItem('reload', "true");
                          this.navCtrl.setRoot('MenuPage');
                        //}, 1000);
                     }
                   }
                 })

               }
             });
           }else{
             //this.presentAlert();
             //alert("login error");
           }
         }, error => {
           //alert("Oooops");
           console.log("Oooops!");
         });
      }else{
        this.errCount++;
        this.init();
        if(this.errCount>2){
          console.log("errCount: "+this.errCount);
          this.errMsg();
          return;
        }
      }
    }
    //localStorage.getItem('reload')
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

  goLogin(){
    this.navCtrl.setRoot("LoginPage");
  }

  listBanner(banner:any){
    var listBanner:any[] = new Array();
    let myObj:any;
    for(let entry of banner){
        myObj = {img1: entry.img1
                };
        listBanner.push(myObj);
    }
    return listBanner;
  }

}
