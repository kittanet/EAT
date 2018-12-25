import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from "jquery";
import { Slides } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WizardLayout2Module } from '../../components/wizard/layout-2/wizard-layout-2.module';

@IonicPage()
@Component({
  selector: 'page-my-favorite',
  templateUrl: 'my-favorite.html',
})
export class MyFavoritePage {

  @ViewChild(Slides) slides: Slides;

  index: any;
  img1: any;
  res: any;
  favorite:any;
  title: string;
  detail_menu: any;
  currentIndex:number=0;
  seclect:any;
  detail_menu_length:number=0;
  conllections_length:number=0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public zone: NgZone,
    private http: HttpClient,
    private geolocation: Geolocation,
    private api: ApiProvider) {
    this.getCollections();
    this.img1 = this.api.url + ":"+ this.api.port + "/eatmatters/img/collections/img009.jpg"
    // localStorage.setItem("page",JSON.stringify(null));
  }

  getCollections() {
    this.favorite = JSON.parse(localStorage.getItem("Favorite"))
    this.clear();
    console.log(this.favorite)

    // let link = this.api.url + ":"+ this.api.port + "/eatmatters/api/get-collection.php";
    // this.http.get(link)
    //   .subscribe(data => {
    //     this.res = data;
    //     // console.log(this.res);
    //     if (this.res.status.code == "0") {
    //       this.conllections = this.res.data;
    //       for(let i=0;i<this.conllections.length;i++) {
    //         if(this.conllections[i].detail_menu == null) {
    //           this.conllections[i].detail_menu = [];
    //         }
    //       }
    //       this.detail_menu = this.conllections[0].detail_menu;
    //       this.title = this.conllections[0].title;
    //       this.detail_menu_length = this.detail_menu.length;
    //       this.conllections_length = this.conllections.length;
    //       this.clear();
    //     }

    //   }, error => {

    //   });
  }

  clear() {
    this.favorite.forEach(element => {
      element.check = false;
    });
    this.seclect = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideMenuPage');
    this.index = 1;
  }

  goSlideMenuPage() {
    this.navCtrl.setRoot("SlideMenuPage");
  }

  goMainCookingPage() {
    if(this.seclect != null) {
      console.log(this.seclect)
      this.navCtrl.setRoot("MainCookingPage",{
        res: this.seclect
      });
    }
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

  changeImg(item:any){
    // this.img1 = this.api.url + ":" + this.api.port + item.img;
    this.img1 = item.img;
    this.seclect = item;
    this.favorite.forEach(element => {
      if(element.id == item.id) {
        element.check = true;
      } else {
        element.check = false;
      }
    });
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {
      /* Hide Modal Menu and Show Collections */
      $("#myCollection").hide();
      $("#i-left").hide();
      $("#i-right").hide();
      mainMenu();

      function mainMenu() {
        $("#myModal").fadeOut();
        $("#myCollection").fadeIn("slow");
        $("#i-right").fadeIn("slow");

        $("#div-middle").hide();
        $("#div-bottom").hide();
        $("#y-scroll").hide();
      }

      $(".hamburger-btn .fa-angle-double-up").click(function () {
        $("#myCollection").fadeIn("slow");
        $("#div-middle").show();
        $("#div-bottom").show();
        $("#y-scroll").show();
      });

      $(".hamburger-btn .fa-angle-double-down").click(function () {
        console.log("click down");
        $("#div-middle").hide();
        $("#div-bottom").hide();
        $("#y-scroll").hide();
      });

      /* Collections */
      $("#myModal #click1").click(function () {
        console.log('ionViewDidLoad Collections');
        mainMenu();
      });

      /* Modal hide when click outside menu  */
      $(".modal").click(function () {
        $("#myModal").fadeOut("slow");
      });

    });
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

}
