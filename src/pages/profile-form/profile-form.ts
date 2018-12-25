import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ProfileFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-form',
  templateUrl: 'profile-form.html',
})
export class ProfileFormPage {

  firstname:string;
  lastname:string;
  tel:string;

  career:string;
  income:string;
  ncap:string;

  loan1:boolean;
  loan2:boolean;
  loan3:boolean;
  loan4:boolean;
  loan5:boolean;

  memberId:string;

  result: Observable<any>;
  member: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public http: AuthHttp,
              public api: ApiProvider) {
    this.api.backPage(navCtrl, "ProfileFormPage");
    this.init();
    this.result = this.http.get(this.api.url+':'+this.api.port+'/api/memberProfiles').map(res => res.json());
    this.result
    .subscribe(data => {
      console.log('>> my member: ');
      console.log(data);
      if(data.status.code=="0"){
        this.member = data.data;
        if(this.member.id!=""){
          this.setValue();
        }
      }
    }, error => {
      console.log("Oooops!");
    });
  }

  ionViewDidLoad() {
    this.init();
    console.log('ionViewDidLoad ProfileFormPage');
  }

  init(){
    this.memberId="";

    this.career = "";
    this.income = "";
    this.ncap = "";

    this.loan1 = false;
    this.loan2 = false;
    this.loan3 = false;
    this.loan4 = false;
    this.loan5 = false;
  }

  setValue(){
    this.memberId = this.member.id;
    this.firstname = this.member.name;
    this.lastname = this.member.lname;
    this.career = this.member.career;
    this.income = this.member.income;
    this.tel = this.member.tel;
    this.loan1 = this.member.loan1=="Y" ? true : false;
    this.loan2 = this.member.loan2=="Y" ? true : false;
    this.loan3 = this.member.loan3=="Y" ? true : false;
    this.loan4 = this.member.loan4=="Y" ? true : false;
    this.loan5 = this.member.loan5=="Y" ? true : false;
    this.ncap = (this.loan1 || this.loan2 || this.loan3 || this.loan4 || this.loan5) ? "1" : "2";
  }

  nextPage(){
    console.log("firstname: "+this.firstname);
    console.log("lastname: "+this.lastname);
    console.log("tel: "+this.tel);

    console.log("career: "+this.career);
    console.log("income: "+this.income);
    console.log("ncap: "+this.ncap);

    console.log("loan1: "+this.loan1);
    console.log("loan2: "+this.loan2);
    console.log("loan3: "+this.loan3);
    console.log("loan4: "+this.loan4);
    console.log("loan5: "+this.loan5);

    if(!this.firstname){
      this.presentAlert("กรุณากรอกข้อมูล ชื่อ");
      return;
    }
    if(!this.lastname){
      this.presentAlert("กรุณากรอกข้อมูล นามสกุล");
      return;
    }
    if(!this.career){
      this.presentAlert("กรุณากรอกข้อมูล อาชีพ");
      return;
    }
    if(!this.income){
      this.presentAlert("กรุณากรอกข้อมูล รายได้ต่อเดือน");
      return;
    }
    if(!this.tel){
      this.presentAlert("กรุณากรอกข้อมูล เบอร์ติดต่อ");
      return;
    }
    if(this.tel && this.tel.length!=10){
      this.presentAlert("ข้อมูลเบอร์ติดต่อไม่ถูกต้อง");
      return;
    }
    if(!this.ncap){
      this.presentAlert("กรุณากรอกข้อมูล ท่านสนใจสินเชื่อ NCAP หรือไม่");
      return;
    }

    let link = this.api.url+':'+this.api.port+'/api/memberProfiles';
    let myData = JSON.stringify({
      id: this.memberId ? this.memberId : 0,
      name: this.firstname,
      lname: this.lastname,
      career: this.career,
      income: this.income,
      tel: this.tel,
      loan1: this.ncap=="1" ? (this.loan1 ? "Y" : "N") : "N",
      loan2: this.ncap=="1" ? (this.loan2 ? "Y" : "N") : "N",
      loan3: this.ncap=="1" ? (this.loan3 ? "Y" : "N") : "N",
      loan4: this.ncap=="1" ? (this.loan4 ? "Y" : "N") : "N",
      loan5: this.ncap=="1" ? (this.loan5 ? "Y" : "N") : "N",
      owner: ""
    });
     //let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
     this.http.post(link, myData).map(res => res.json())
     .subscribe(data => {
       console.log("memberProfiles");
       console.log(data);
       if(data.status.code == "0"){
         this.navCtrl.setRoot("ProfileCompletePage");
         //localStorage.setItem('questionnaire', "2");
         //this.navCtrl.setRoot('Questionnaire2ndPage');
       }
       console.log("end");
     }, error => {
       console.log("Oooops!");
     });

  }

  goHome(){
    this.navCtrl.setRoot("MenuPage");
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'ข้อมูลไม่ถูกต้อง',
      message: text,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  goProfileCompletePage(){
    this.navCtrl.setRoot("ProfileCompletePage");
  }

  onChangeCareer(value){
    this.career = value;
  }

  onChangeIncome(value){
    this.income = value;
  }

  onChangeNcap(value){
    this.ncap = value;
  }

}
