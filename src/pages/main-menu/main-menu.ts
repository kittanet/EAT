import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public zone: NgZone,
    private http: HttpClient,
    private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
    //this.alertMenu3();
  }

  alertMenu3() {
    let alert = this.alertCtrl.create({
      title: 'Select Menu',
      buttons: [
        {
          text: 'Collections',
          handler: () => {
            console.log('Buy clicked');
          }
        },
        {
          text: 'My Favorite',
          handler: () => {
            console.log('Buy clicked');
          }
        },
        {
          text: 'Eng',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Thai',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    /*
        alert.setTitle('Select Menu');
    
        alert.addButton({
          text: 'Collections',
          handler: () => {
            console.log('Confirm Ok 1');
          }
        });
    
        alert.addButton({
          text: 'My Favorite',
          handler: () => {
            console.log('Confirm Ok 2');
          }
        });
    
        alert.addButton({
          text: 'My Healthy Choice',
          handler: () => {
            console.log('Confirm Ok 3');
          }
        });
    */
    alert.present().then(() => {
      console.log('Radio present:');
    });

  }

  alertMenu() {
    let alert = this.alertCtrl.create({
      cssClass: 'alert-menu',
      message: '<div class="frist"><div>Collections</div></div>' +
        '<div class="frist"><div>My Favorite</div></div>' +
        '<div class="frist"><div>My Healthy Choice</div></div>' +
        '<div class="frist"><div>Shopping List</div></div>' +
        '<div class="last"><div><img src="assets/images/eng.png"><span>Eng</span>' +
        '&nbsp;&nbsp;&nbsp;<img src="assets/images/th.png"><span>Thai<span></div></div>'
    });
    alert.present();
  }

  alertMenu2() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Green',
      value: 'green'
    });

    alert.addInput({
      type: 'radio',
      label: 'Red',
      value: 'red'
    });

    alert.addInput({
      type: 'radio',
      label: 'Yellow',
      value: 'yellow'
    });

    alert.addInput({
      type: 'radio',
      label: 'Purple',
      value: 'purple'
    });

    alert.addInput({
      type: 'radio',
      label: 'White',
      value: 'white'
    });

    alert.addInput({
      type: 'radio',
      label: 'Black',
      value: 'black',
      handler: data => {
        console.log('Radio Black:', data);
      }
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
      }
    });

    alert.present().then(() => {
      console.log('Radio present:');
    });
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {

      $("#myModal").fadeIn("slow");
      $("#myCollection").hide();
      //$("#myCollection").fadeIn("slow");

      $("#menu").click(function () {
        $("#myModal").fadeIn("slow");
        $("#myCollection").hide();
      });

      $("#myBtn").click(function () {
        console.log('ionViewDidLoad ooooo');
        $("#myModal").fadeIn("slow");
      });

      /* Collections */
      $("#click1").click(function () {
        console.log('ionViewDidLoad click1');
        $("#myModal").fadeOut();
        $("#myCollection").slideDown("slow");
      });


      //
      //$(".hamburger-btn .fa-angle-double-up").hide();

      $(".hamburger-btn .fa-angle-double-down").click(function () {
        $(this).hide();
        $(".hamburger-btn .fa-angle-double-up").show();
        $(".mob ul").addClass("active");

        $(".mob ul").click(function () {
          $(".mob ul").removeClass("active");
          $(".hamburger-btn .fa-angle-double-up").hide();
          $(".hamburger-btn .fa-angle-double-down").show();
        });

      });

      $(".hamburger-btn .fa-angle-double-up").click(function () {
        $(this).hide();
        $(".hamburger-btn .fa-angle-double-down").show();
        $(".mob ul").removeClass("active");
      });
      /* Collections */

      /* My Favorite */
      $("#click2").click(function () {
        console.log('ionViewDidLoad click2');
        $("#myModal").fadeOut("slow");
      });

      $("#click3").click(function () {
        console.log('ionViewDidLoad click3');
        $("#myModal").fadeOut("slow");
      });

    });
  }

  nextPage() {
    this.navCtrl.push("ProfileChangePasswordPage");
  }

  scrollToSection1(){
    this.navCtrl.push("TestMainMenuPage");
  }
}
