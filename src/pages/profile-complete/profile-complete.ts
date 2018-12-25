import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ProfileCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-complete',
  templateUrl: 'profile-complete.html',
})
export class ProfileCompletePage {

  result: Observable<any>;
  member: any;

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: AuthHttp,
              public api: ApiProvider) {
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
        }else{
          navCtrl.setRoot("ProfileFormPage");
        }
      }
    }, error => {
      navCtrl.setRoot("ProfileFormPage");
      console.log("Oooops!");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileCompletePage');
  }

  init(){
    this.firstname = "";
    this.lastname = "";
    this.tel = "";

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

  goHome(){
    this.navCtrl.setRoot("MenuPage");
  }

  goProfileFormPage(){
    this.navCtrl.setRoot("ProfileFormPage");
  }

}
