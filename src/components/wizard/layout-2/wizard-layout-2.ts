import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'wizard-layout-2',
  templateUrl: 'wizard.html'
})

export class WizardLayout2 {
  img1: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
    this.img1 = "assets/images/img002.jpg";
  }

  ngAfterViewInit() {
    console.log('ionViewDidLoad xxxx');

    $(document).ready(function () {

      //$("#myModal").delay(500).fadeIn("slow");

      mainMenu();
      console.log("hello");

      $("#btnMenu").click(function () {
        $("#myModal").delay(500).fadeIn("slow");
      });


      /* Collections */
      $("#click1").click(function () {
        console.log('ionViewDidLoad click1');
        mainMenu();
      });

      function mainMenu() {

        $("#myModal").fadeOut();
      }
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

      $(".modal").click(function () {
        console.log("action 1");
        $("#myModal").fadeOut("slow");
      });

    });

  }
}
