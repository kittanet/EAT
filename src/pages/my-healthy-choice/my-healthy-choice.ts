import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from "jquery";
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-my-healthy-choice',
  templateUrl: 'my-healthy-choice.html',
})

export class MyHealthyChoicePage {
  img1: any;
  style: any = [{
    "index": "1",
    "name": "Low Fat"
  }, {
    "index": "2",
    "name": "Low Carb"
  }, {
    "index": "3",
    "name": "Diabetes"
  }, {
    "index": "4",
    "name": "Hypertension"
  }, ];
  send:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {
    this.img1 = this.api.url + ":" + this.api.port + "/eatmatters/img/collections/img003bg.jpg";
    for (let i = 0; i < this.style.length; i++) {
      this.style[i].select = false;
    }
  }

  change(index) {
    for (let i = 0; i < this.style.length; i++) {
      if (this.style[i].index == index) {
        this.style[i].select = !this.style[i].select;
      }
    }
  }

  findStyle() {
    this.send=[];
    for (let i = 0; i < this.style.length; i++) {
      if (this.style[i].select == true) {
        this.send.push({"index":this.style[i].index,"name":this.style[i].name})
      }
    }
    alert(JSON.stringify(this.send));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHealthyChoicePage');
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