import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  img1: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider) {
    this.img1 = this.api.url+":"+this.api.port+"/eatmatters/img/collections/img005.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
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
