import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html',
})
export class BlankPage {
  params: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.params.data = {
      "items": [
              {
                  "id": 1,
                  "title": "Product 1",
                  "backgroundImage": "assets/images/background/22.jpg",
                  "button": "BUY",
                  "items": [
                      "PAY WITH PAYPAL",
                      "PAY WITH VISA CARD",
                      "PAY WITH MAESTRO CARD"
                  ]
              }
          ]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlankPage');
  }

}
