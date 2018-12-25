import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { ApiProvider } from '../../providers/api/api';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-chefs-tip',
  templateUrl: 'chefs-tip.html',
})
export class ChefsTipPage {
  step:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private streamingMedia: StreamingMedia,
    private api: ApiProvider) {
    this.step = this.navParams.get("step");
    console.log(this.step)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChefsTipPage');
  }

  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };

    // http://www.sample-videos.com/
    this.streamingMedia.playVideo(this.step.video.url, options);
  }

  goBack() {
    this.navCtrl.setRoot("CookingPage");
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
