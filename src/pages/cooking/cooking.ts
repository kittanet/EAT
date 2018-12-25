import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-cooking',
  templateUrl: 'cooking.html',
})
export class CookingPage {

  @ViewChild(Slides) slides: Slides;
  res: any;
  img1: any;
  step:any;
  page:number=0;
  video:string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider) {
    // if(JSON.parse(localStorage.getItem("page")) != null){
    //   this.page = JSON.parse(localStorage.getItem("page"));
    // }
    this.res = this.navParams.get("res");
    this.step = this.res.Step;
    // this.step = JSON.parse(localStorage.getItem("Step"));
    console.log(this.video)
  }

  slideChanged() {
    this.page = this.slides.getActiveIndex();
    // console.log(this.page)
    // console.log(this.step.length)
    if (this.page != this.step.length) {
      this.video = this.step[this.page].video;
      // localStorage.setItem("page",JSON.stringify(this.page));
    }
  }

  // next() {
  //   ++this.page;
  //   this.img1 = this.step[this.page].img;
  //   this.title = this.step[this.page].title;
  //   this.detail = this.step[this.page].detail;
  //   this.video = this.step[this.page].video;
  // }

  // back() {
  //   --this.page;
  //   this.img1 = this.step[this.page].img;
  //   this.title = this.step[this.page].title;
  //   this.detail = this.step[this.page].detail;
  //   this.video = this.step[this.page].video;
  //   localStorage.setItem("page",JSON.stringify(this.page));
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CookingPage');
  }

  goChefsTipPage() {
    this.navCtrl.setRoot("ChefsTipPage",{
      step : this.step[this.page]
    });
  }

  backPage() {
    console.log(this.res)
    this.navCtrl.setRoot("MainCookingPage",{
      res: this.res
    });
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
