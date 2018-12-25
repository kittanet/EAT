import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AuthHttp } from 'angular2-jwt';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  items: Array<{ pageName: string, bgColor: string, imgmenu: string, urlPage: string, 
    nextPage: String, nextTab: String }>;

  banners: Array<{ img1: any }>;
  headers: Array<{ img1: any }>;

  questionnaire: any;

  scanData: {};
  options: BarcodeScannerOptions;

  result: Observable<any>;
  question: any;

  promotion: any;

  getDate: String = new Date().toISOString();
  colorDate: String;

  selectedTab: IScrollTab;

  uname:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private themeableBrowser: ThemeableBrowser,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private http: AuthHttp) {

    this.uname = localStorage.getItem('uname');
    console.log(this.colorDate);
    //this.api.backPage(navCtrl, "MenuPage");
    this.headers = this.api.headers;
    this.banners = this.api.banners;

    /*
    this.headers = [
      { img1: "assets/images/menu/header.png" },
      { img1: "assets/images/menu/header.png" }
    ];

    this.banners = [
      { img1: "assets/images/menu/banner.png" },
      { img1: "assets/images/menu/banner.png" }
    ];*/
  
    this.items = [
      {
        "pageName": "PreBookingPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon001.png',
        "urlPage": "",
        "nextPage": "BlankPage",
        "nextTab": "0"

      },
      {
        "pageName": "ListStatusOrderPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon002.png',
        "urlPage": "",
        "nextPage": "BlankPage",
        "nextTab": "1"
      },
      {
        "pageName": "EstimationPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon003.png',
        "urlPage": "",
        "nextPage": "BlankPage",
        "nextTab": "2"
      },
      {
        "pageName": "SearchEvPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon004.png',
        "urlPage": "",
        "nextPage": "",
        "nextTab": "3"
      },
      {
        "pageName": "NewsPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon005.png',
        "urlPage": "",
        "nextPage": "BlankPage",
        "nextTab": "4"
      },
      {
        "pageName": "QrPayPage",
        "bgColor": "#3555F5",
        "imgmenu": 'http://miwserver.ddns.net:8555/ev-user/img/menu/icon006.png',
        "urlPage": "",
        "nextPage": "BlankPage",
        "nextTab": "5"
      }
    ];
  }

  ionViewDidLoad() {
    //this.headers = this.api.headers;
    //this.banners = this.api.banners;
    // this.headers = [
    //   {img1: "assets/images/menu/head.png"}
    // ];
    //
    // this.banners = [
    //   {img1: "assets/images/menu/footer.png"}
    // ];

    if (localStorage.getItem('reload') == "true") {
      setTimeout(() => {
        localStorage.setItem('reload', "false");
        console.log("action");
        this.goHome();
        this.api.backPage(this.navCtrl, "MenuPage");
      }, 2000);
    }
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page) {
    if (page.urlPage) {
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#292770'
        },
        toolbar: {
          height: 44,
          color: '#292770'
        },
        title: {
          color: '#ffffff',
          showPageTitle: true,
          staticText: 'Bangkok Motor Show'
        },
        closeButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'closePressed'
        },
        disableAnimation: false
      };

      const browser: ThemeableBrowserObject = this.themeableBrowser.create(page.urlPage, '_blank', options);

      browser.on('closePressed').subscribe(data => {
        browser.close();
      })

    } else {
      if (page.pageName != "link" && page.pageName != "gift" && page.pageName != "qrcode" && page.pageName != "") {
        localStorage.setItem('back_page', "MenuPage");
        console.log('pageName = ', page.pageName);
        console.log('nextPage = ', page.nextPage);
        console.log('nextTab = ', page.nextTab);
        this.navCtrl.push(page.pageName, { 'nextPageSelect': page.nextPage, 'nextTabSelect': page.nextTab });
      }
      if (page.pageName == "gift") {

        this.result = this.http.get(this.api.url + ':' + this.api.port + '/api/personalInfos/personalInfo').map(res => res.json());
        this.result
          .subscribe(data => {
            console.log('>> my data: ');
            this.question = data;
            if (this.question.status.code == "0") {
              let q1 = this.question.data.personalInfo1.length;
              let q2 = this.question.data.personalInfo2.length;
              let q3 = this.question.data.personalInfo3.length;
              let q4 = this.question.data.personalInfo4.length;
              if (q1 > 0) {
                if (q2 > 0) {
                  if (q3 > 0) {
                    if (q4 > 0) {
                      this.navCtrl.setRoot('QuestionnaireCompletePage');
                    } else {
                      this.navCtrl.setRoot('Questionnaire4thPage');
                    }
                  } else {
                    this.navCtrl.setRoot('Questionnaire3rdPage');
                  }
                } else {
                  this.navCtrl.setRoot('Questionnaire2ndPage');
                }
              } else {
                this.navCtrl.setRoot('QuestionnaireShowImagePage');
              }
            }
          })
      }
      if (page.pageName == "qrcode") {
        this.scan();
      }
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'ถาม-ตอบ ชิงรถยนต์',
      message: 'กรุณาตอบคำถามให้ครบทุกหน้า จาก email ที่ท่านตอบคำถามค้างไว้',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  presentAlertNoEmpty() {
    let alert = this.alertCtrl.create({
      title: 'ถาม-ตอบ ชิงรถยนต์',
      message: 'กรุณาตอบคำถามให้ครบทุกหน้า จากเครื่องที่ท่านตอบคำถามไว้',
      buttons: ['ตกลง']
    });
    alert.present();
  }

  onLogout() {
    localStorage.setItem('access_token', "");
    this.navCtrl.setRoot('LoginPage');
  }

  scan() {
    this.options = {
      prompt: "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      console.log(barcodeData);
      //this.scanData = barcodeData;
      //alert(barcodeData.text);
      if (barcodeData.text) {
        let link = this.api.url + ':' + this.api.port + '/api/promotions/usePromotion';
        let myData = JSON.stringify({
          //code: barcodeData.text
          code: "002"
        });
        this.http.post(link, myData).map(res => res.json())
          .subscribe(data => {
            console.log("promotion");
            console.log(data);
            this.promotion = data;
            if (this.promotion.status.code == "0") {
              console.log(">> " + this.promotion.status.code);
              this.navCtrl.push("PromationFinishedPage", { 'refno': this.promotion.data.refno });
            } else if (this.promotion.status.code == "1") {
              this.presentAlertError("โควต้าเต็ม");
              return;
            } else if (this.promotion.status.code == "2") {
              this.presentAlertError("รหัสโปรโมชั่นไม่ถูกต้อง");
              return;
            }
            console.log("end");
          }, error => {
            console.log("Oooops!");
          });
        //this.navCtrl.push("PromationFinishedPage", { 'qrcode': barcodeData.text });
      }
    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  goHome() {
    this.navCtrl.setRoot("MenuPage");
  }

  presentAlertError(text) {
    let alert = this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด',
      message: text,
      buttons: ['ตกลง']
    });
    alert.present();
  }
}
