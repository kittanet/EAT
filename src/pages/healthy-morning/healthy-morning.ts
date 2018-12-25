import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-healthy-morning',
  templateUrl: 'healthy-morning.html',
})
export class HealthyMorningPage {
  img1: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {
    this.img1 = "assets/images/img007.jpg";
  }

  goCookingPage() {
    this.navCtrl.setRoot("CookingPage");
  }

  goBack() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthyMorningPage');
  }

  backPage() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  /* menu */
  goSlideMenuPage() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  goMyFavoritePage() {
    this.navCtrl.setRoot("MyFavoritePage");
  }

  goMyHealthyChoicePage() {
    this.navCtrl.setRoot("MyHealthyChoicePage");
  }

  goShoppingListPage() {
    this.navCtrl.setRoot("ShoppingListPage");
  }

  openMyModal() {
    console.log('ionViewDidLoad openMyModal');
    $(document).ready(function () {

      $("#myModal").fadeIn("slow");

      $("#myCollection").hide();
      $("#i-left").hide();
      $("#i-right").hide();
    });
  }


  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {

      /* Modal hide when click outside menu  */
      $(".modal").click(function () {
        $("#myModal").fadeOut("slow");
      });

    });
  }

  /* menu */
}
