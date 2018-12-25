import { Component, Input } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

@IonicPage()
@Component({
  selector: 'register-layout-1',
  templateUrl: 'register.html'
})
export class RegisterLayout1 {

  @Input() data: any;
  @Input() events: any;

  bday: string;
  name: string;
  lname: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  email: string;
  phone: string;

  register: any;

  result: Observable<any>;
  login: any;
  accessToken: any;

  banner: any;
  header: any;

  constructor(public http: HttpClient,
    private app: App,
    public datepipe: DatePipe,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    private authHttp: AuthHttp) {
    this.email = this.api.email;
    this.name = this.api.username;
  }

  onEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]({
        'username': this.name,
        'password': this.password,
        'country': this.country,
        'city': this.city,
        'email': this.email
      });
    }
  }

  regisFail() {
    let alert = this.alertCtrl.create({
      title: 'ลงทะเบียนไม่สำเร็จ',
      subTitle: 'กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  regisOk() {
    let alert = this.alertCtrl.create({
      title: 'สถานะรายการ',
      subTitle: 'ลงทะเบียนสำเร็จ',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  regisFailMsg(txt: string) {
    let alert = this.alertCtrl.create({
      title: 'กรุณาตรวจสอบข้อมูลของท่านอีกครั้ง',
      subTitle: txt,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  checkRegister() {
    if (!this.name) {
      this.regisFailMsg("กรุณาใส่ Frist Name");
      return;
    } else if (!this.lname) {
      this.regisFailMsg("กรุณาใส่ Last Name");
      return;
    } else if (!this.password || !this.confirmPassword) {
      this.regisFailMsg("กรุณาใส่ รหัสผ่าน");
      return;
    } else if (!this.validateEmail(this.email)) {
      this.regisFailMsg("อีเมล ของท่านไม่ถูกต้อง");
      return;
    } else if (!this.validatePhone(this.phone)) {
      this.regisFailMsg("เบอร์โทรศัพท์ ของท่านไม่ถูกต้อง");
      return;
    } else if (this.password.length < 6 || this.confirmPassword.length < 6) {
      this.regisFailMsg("รหัสผ่านต้องมี 6 หลักขึ้นไป");
      return;
    } else if (!this.bday) {
      this.regisFailMsg("กรุณาใส่ วันเกิด");
      return;
    } 
    this.onRegister();
  }

  validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone: string) {
    var re = /^\d{10}$/;
    return re.test(phone);
  }

  onRegister() {
    var date = new Date();
    var today = this.datepipe.transform(date, 'yyyy-MM-dd');
    if (!this.email
      && !this.phone
      && !this.name
      && !this.lname
      && !this.password
      && !this.bday) {
      this.regisFail();
    } else if (this.password != this.confirmPassword) {
      this.data.confirmPassword = "รหัสยืนยัน Password ไม่ถูกต้อง";
    } else {
      console.log("===== register =====");
      console.log("this.email: " + this.email);
      console.log("this.phone: " + this.phone);
      console.log("this.name: " + this.name);
      console.log("this.lname: " + this.lname);
      console.log("this.password: " + this.password);
      console.log("this.bday: " + this.bday);
      console.log("today: " + today);

      //http://172.16.195.56:9999/api/pretties?email=xxx
      //let link = this.api.url+':'+this.api.port+'/sec/signup';
      let link = this.api.url + ':8555/ev-user/api/post-signup.php';
      //let channel = this.api.email != "" ? "F" : "D";
      let channel = "D";
      let myData = JSON.stringify({
        channel: channel,
        email: this.email,
        msisdn: this.phone,
        name: this.name,
        lname: this.lname,
        passwd: this.password,
        bday: this.bday,
        register: today
      });
      let headers = { headers: new HttpHeaders() };
      console.log("link");
      console.log(link);
      console.log("myData");
      console.log(myData);
      console.log("headers");
      console.log(headers);
      this.http.post(link, myData, headers)
        .subscribe(data => {
          console.log("result");
          console.log(data);
          this.register = data;
          if (this.register.status.code == "0") {
            console.log(">> " + this.register.status.code);
            this.regisOk();
            this.api.email = this.email;
            if (this.api.email != "") {
              let link = this.api.url + ':8555/ev-user/api/post-login.php';
              console.log("link: " + link);
              //alert(link);
              let myData = JSON.stringify({
                email: this.email,
                passwd: this.password
              });
              let headers = { headers: new HttpHeaders() };

              this.http.post(link, myData, headers)
                .subscribe(data => {
                  console.log('>> my data: ', data);
                  this.login = data;
                  console.log(data);
                  console.log("status: " + this.login.status.code);
                  if (this.login.status.code == "0") {
                    //alert("login ok");
                    localStorage.setItem('access_token', this.login.data.access_token);
                    localStorage.setItem('username', this.email);
                    localStorage.setItem('password', this.password);

                    let link = 'http://miwserver.ddns.net:8555/ev-user/api/get-banner.php';
                    this.http.get(link)
                      .subscribe(data => {
                        console.log(data);
                        this.banner = data;
                        if (this.banner.status.code == "0") {
                          console.log(data);
                          this.api.banners = this.listBanner(this.banner.data);

                          let link = 'http://miwserver.ddns.net:8555/ev-user/api/get-header.php';
                          this.http.get(link)
                            .subscribe(data => {
                              console.log(data);
                              this.header = data;
                              if (this.header.status.code == "0") {
                                console.log(data);
                                this.api.headers = this.listBanner(this.header.data);
                                localStorage.setItem('reload', "true");
                                this.app.getRootNav().setRoot("MenuPage");
                              }
          
                            }, error => {
                              console.log("Oooops!");
                            });

                        }

                      }, error => {
                        console.log("Oooops!");
                      });
                  }
                }, error => {
                  //alert("Oooops");
                  console.log("Oooops!");
                });
              console.log("end");
              /*  let link1 = this.api.url+':'+this.api.port+'/sec/login?email='+this.email+'&passwd='+this.password;
                let myData1 = JSON.stringify({
                });
                this.http1.post(link1, myData1, headers)
                .subscribe(data => {
                  console.log('>> my data: ', data);
                  this.login = data;
                  console.log(data);
                  console.log("status: "+this.login.status.code);
                  if(this.login.status.code=="0"){
                    localStorage.setItem('access_token', this.login.data.access_token);
                    localStorage.setItem('username', this.email);
                    localStorage.setItem('password', this.password);
 
                    this.result = this.authHttp.get(this.api.url+':'+this.api.port+'/api/banners').map(res => res.json());
                    this.result
                    .subscribe(data => {
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
                                 this.app.getRootNav().setRoot("MenuPage");
                               //}, 1000);
                            }
                          }
                        })
 
                      }
                    });
                  }
                }, error => {
                  console.log("Oooops!");
                });
                */
            } else {
              this.app.getRootNav().setRoot("LoginPage");
            }
          } else {
            this.regisFail();
          }
          console.log("end");
        }, error => {
          console.log("Oooops!");
        });
    }
  }

  listBanner(banner: any) {
    var listBanner: any[] = new Array();
    let myObj: any;
    for (let entry of banner) {
      myObj = {
        img1: entry.img1
      };
      listBanner.push(myObj);
    }
    return listBanner;
  }

  goLogin() {
    this.app.getRootNav().setRoot("LoginPage");
  }

  openRegisterPhoneNumber() {
    this.app.getRootNav().setRoot("RegisterPhoneNumberPage");
  }
}
