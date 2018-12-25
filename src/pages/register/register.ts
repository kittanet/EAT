import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  params: any = {};
  img1: any;
  users: any;

  isLoggedIn: boolean = false;
  login: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    public datepipe: DatePipe,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private twitter: TwitterConnect) {
    this.img1 = this.api.url + ":" + this.api.port + "/eatmatters/img/collections/img003bg.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goLogin(ch: string) {
    var link = this.api.url + ":" + this.api.port + "/eatmatters/api/post-login.php";
    var date = new Date();
    var today = this.datepipe.transform(date, 'yyyy-MM-dd');
    var headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (ch == "Facebook") {
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          if (res.status === "connected") {
            this.fb.api("/" + res.authResponse.userID + "/?fields=id,email,first_name,last_name,picture", ["public_profile"])
              .then(res => {
                this.users = res;
                let myData = JSON.stringify({
                  email: this.users.email,
                  firstName: this.users.first_name,
                  lastName: this.users.last_name,
                  register: today
                });
                this.http.post(link, myData, headers)
                  .subscribe(data => {
                    this.login = data;
                    if (this.login.status.code == "0") {
                      localStorage.setItem('Member', this.users.email);
                      localStorage.setItem('uphoto', this.users.picture.data.url);
                      let alert = this.alertCtrl.create({
                        title: "Can sign in",
                        message: "<span class='txt12'>You sign in with " + ch + " complete.</span>",
                        buttons: ['OK']
                      });
                      alert.present();
                      this.dismiss();
                    } else {
                      let alert = this.alertCtrl.create({
                        title: "Can't sign in",
                        message: "<span class='txt12'>Can't sign in " + ch + ".</span>",
                        buttons: ['OK']
                      });
                      alert.present();
                    }
                  }, err => {

                  });

              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => console.log('Error logging into Facebook', e));

    } else if (ch == "Twitter") {
      this.twitter.login()
        .then(res => {
          alert(JSON.stringify(res));
          
          this.twitter.showUser()
            .then(res2 => {
              alert(JSON.stringify(res2));
            })
            .catch(e2 => {
              alert('error2');
              alert(JSON.stringify(e2));
            });
        })
        .catch(e => {
          alert('error1');
          alert(JSON.stringify(e));
        });

      
      // this.fire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      // .then(res => {
      //   console.log(res.additionalUserInfo.profile)
      //   this.users = res.additionalUserInfo.profile;
      //   let myData = JSON.stringify({
      //     email: this.users.email,
      //     firstName: this.users.given_name,
      //     lastName: this.users.family_name,
      //     register: today
      //   });
      //   this.http.post(link, myData, headers)
      //     .subscribe(data => {
      //       this.login = data;
      //       if (this.login.status.code == "0") {
      //         localStorage.setItem('Member', this.users.email);
      //         localStorage.setItem('uphoto', this.users.picture);
      //         let alert = this.alertCtrl.create({
      //           title: "Can sign in",
      //           message: "<span class='txt12'>You sign in with " + ch + " complete.</span>",
      //           buttons: ['OK']
      //         });
      //         alert.present();
      //         this.dismiss();
      //       } else {
      //         let alert = this.alertCtrl.create({
      //           title: "Can't sign in",
      //           message: "<span class='txt12'>Can't sign in " + ch + ".</span>",
      //           buttons: ['OK']
      //         });
      //         alert.present();
      //       }
      //     }, err => {

      //     });
      // })
      // .catch(err => {

      // })
    } else {
      this.googlePlus.login({})
        .then(res => {
          this.users = res;
          let myData = JSON.stringify({
            email: this.users.email,
            firstName: this.users.givenName,
            lastName: this.users.familyName,
            register: today
          });
          this.http.post(link, myData, headers)
            .subscribe(data => {
              this.login = data;
              if (this.login.status.code == "0") {
                localStorage.setItem('Member', this.users.email);
                localStorage.setItem('uphoto', this.users.imageUrl);
                let alert = this.alertCtrl.create({
                  title: "Can sign in",
                  message: "<span class='txt12'>You sign in with " + ch + " complete.</span>",
                  buttons: ['OK']
                });
                alert.present();
                this.dismiss();
              } else {
                let alert = this.alertCtrl.create({
                  title: "Can't sign in",
                  message: "<span class='txt12'>Can't sign in " + ch + ".</span>",
                  buttons: ['OK']
                });
                alert.present();
              }
            }, err => {

            });
        })
        .catch(e => console.log('Error logging into Google', e));
    }
  }
}
