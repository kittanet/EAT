import { Component, Input } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { AuthHttp } from 'angular2-jwt';
//import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage()
@Component({
  selector: 'login-layout-1',
  templateUrl: 'login.html'
})
export class LoginLayout1 {
  @Input() data: any;
  @Input() events: any;

  public username: string;
  public password: string;

  isLoggedIn: boolean = false;
  users: any;

  result: Observable<any>;
  login: any;
  accessToken: any;

  banner: any;
  header: any;

  constructor(private fb: Facebook,
    private app: App,
    public http: HttpClient,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    private authHttp: AuthHttp) {
    //private ga: GoogleAnalytics) {
    //ga.trackView('LoginLayout1');
    localStorage.setItem('back_page', "");

    api.email = "";
    api.username = "";
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    
    /*
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
      */
  }

  onEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]({
        'username': this.username,
        'password': this.password
      });
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถเข้าสู่ระบบได้',
      cssClass: 'popupOrange',
      subTitle: '<img src="assets/images/bg/warning.png">',
      message: '<span class="txt12">กรุณาตรวจสอบ Username และ Password ของท่านอีกครั้ง</span>',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  /* presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถเข้าสู่ระบบได้',
      subTitle: 'กรุณาตรวจสอบ Username และ Password ของท่านอีกครั้ง',
      buttons: ['ตกลง']
    });
    alert.present();
  } */

  onLogin() {
    //this.ga.trackEvent("LoginLayout1", "Action", "Label", 25);
    //this.app.getRootNav().setRoot("HomePage");
    console.log("username: " + this.username);
    console.log("password: " + this.password);
    let link = this.api.url + ':8555/ev-user/api/post-login.php';
    console.log("link: " + link);
    //alert(link);
    let myData = JSON.stringify({
      email: this.username,
      passwd: this.password
    });
    console.log(myData);
    let headers = { headers: new HttpHeaders() };

    this.http.post(link, myData, headers)
      .subscribe(data => {
        console.log('>> my data: ', data);
        this.login = data;
        console.log(data);
        console.log("status: " + this.login.status.code);
        if (this.login.status.code == "0") {
          //alert("login ok");
          localStorage.setItem('uname', this.login.data.memberDto.name);
          localStorage.setItem('access_token', this.login.data.access_token);
          localStorage.setItem('username', this.username);
          localStorage.setItem('userid', this.login.data.memberDto.id);
          localStorage.setItem('password', this.password);
          localStorage.setItem('active_pin', this.username);
          localStorage.setItem('active_pass', this.password);

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

          /*
                   this.result = this.http.get(this.api.url+':8555/edde/api/get-banner.php');
                   this.result
                   .subscribe(data => {
                     //alert("banners ok");
                     console.log('>> my banners: ');
                     this.banner = data;
                     if(this.banner.status.code=="0"){
                       console.log(data);
                       this.api.banners = this.listBanner(this.banner.data);
          
                       this.result = this.http.get(this.api.url+':'+this.api.port+'/api/headers');
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
                   */
        } else {
          this.presentAlert();
          //alert("login error");
        }
      }, error => {
        //alert("Oooops");
        console.log("Oooops!");
      });
    console.log("end");
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          //alert(res.authResponse.accessToken);
          this.accessToken = res.authResponse.accessToken;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
          //alert("Error");
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logoutFacebook() {
    this.fb.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        //alert("Hi "+this.users.id+" | "+this.users.name);
        //this.app.getRootNav().setRoot("MenuPage");

        //let link = this.api.url+':'+this.api.port+'/sec/loginSocial?email='+this.users.email+'&channel=F';
        let link = this.api.url + ':' + this.api.port + '/sec/loginFB?email=' + this.users.email + '&channel=F&accessToken=' + this.accessToken;
        console.log("link: " + link);
        //alert(link);
        let myData = JSON.stringify({
          //email: this.username,
          //passwd: this.password
        });
        console.log(myData);
        let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        this.http.post(link, myData, headers)
          .subscribe(data => {
            console.log('>> my data: ', data);
            this.login = data;
            console.log(data);
            if (this.login.status.code == "0") {
              console.log("status: " + this.login.status.code);
              if (this.login.status.code == "0") {
                localStorage.setItem('access_token', this.login.data.access_token);

                this.result = this.authHttp.get(this.api.url + ':' + this.api.port + '/api/banners').map(res => res.json());
                this.result
                  .subscribe(data => {
                    console.log('>> my banners: ');
                    this.banner = data;
                    if (this.banner.status.code == "0") {
                      console.log(data);
                      this.api.banners = this.listBanner(this.banner.data);
                      // this.api.banners = [
                      //   {img1: "assets/images/menu/footer.png"},
                      //   {img1: "assets/images/menu/footer.png"}
                      // ];

                      this.result = this.authHttp.get(this.api.url + ':' + this.api.port + '/api/headers').map(res => res.json());
                      this.result
                        .subscribe(data => {
                          console.log('>> my headers: ');
                          this.header = data;
                          if (this.header.status.code == "0") {
                            console.log(data);
                            this.api.headers = this.listBanner(this.header.data);
                            // this.api.headers = [
                            //   {img1: "assets/images/menu/head.png"},
                            //   {img1: "assets/images/menu/head.png"}
                            // ];

                            if (this.api.headers) {
                              //setTimeout(() => {
                              localStorage.setItem('reload', "true");
                              this.app.getRootNav().setRoot("MenuPage");
                              //}, 1000);
                            }
                          }
                        })

                    }
                  })

              } else {
                this.presentAlert();
              }
            } else {
              this.api.email = this.users.email;
              this.api.username = this.users.name;
              this.app.getRootNav().push("RegisterPage");
            }
          }, error => {
            console.log("Oooops!");
          });

      })
      .catch(e => {
        console.log(e);
      });
  }

  listBanner(banner: any) {
    var listBanner: any[] = new Array();
    let myObj: any;
    for (let entry of banner) {
      myObj = {
        img1: entry.img1,
        intlink: entry.intlink,
        extlink: entry.extlink
      };
      listBanner.push(myObj);
    }
    return listBanner;
  }

  goForgetPasswordPage() {
    this.app.getRootNav().setRoot('ProfileForgetPasswordPage');
  }

  goChangePasswordPage() {
    this.app.getRootNav().setRoot('ProfileChangePasswordPage');
  }

  goScreenCountDown () {
    this.app.getRootNav().setRoot('ScreenButtonPage');
  }

  goMenu () {
    this.app.getRootNav().setRoot('MenuPage');
  }

  goLoginNew() {
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
}
