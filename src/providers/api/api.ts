import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Platform } from 'ionic-angular';

@Injectable()
export class ApiProvider {

  email : string ;
  username : string;
  banners: Array<{img1: any}>;
  headers: Array<{img1: any}>;

  url = "http://miwserver.ddns.net";
  port = "8555";

  //url = "http://52.187.124.14";
  //port = "9999";

  constructor(public http: HttpClient,
              private themeableBrowser: ThemeableBrowser,
              private platform: Platform) {
    console.log('Hello ApiProvider Provider');
  }

   openPage(navCtrl: NavController, banner: any){
     if(banner.intlink!=""){
       navCtrl.setRoot(banner.intlink);
       return;
     }
     if(banner.extlink!=""){
       this.onClick(banner.extlink);
       return;
     }
   }

   onClick(url: string) {
     if (url) {
       const options: ThemeableBrowserOptions = {
         statusbar: {
           color: '#c3922e'
         },
         toolbar: {
           height: 44,
           color: '#c3922e'
         },
         title: {
           color: '#ffffff',
           showPageTitle: true,
           staticText: 'NCAP'
         },
         closeButton: {
           image: 'back',
           imagePressed: 'back_pressed',
           align: 'left',
           event: 'closePressed'
         },
         disableAnimation: false
       };

       const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);

       browser.on('closePressed').subscribe(data => {
         browser.close();
       })

     }
   }

   backPage(navCtrl: NavController, page: string){
     this.platform.registerBackButtonAction(() => {
       if(localStorage.getItem('back_page')!=""){
         navCtrl.setRoot(localStorage.getItem('back_page'));
       }
       //localStorage.setItem('back_page', page);
     },1);
   }
}
