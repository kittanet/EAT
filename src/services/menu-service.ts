import { IService } from './IService';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings';
import { LoadingService } from './loading-service';

@Injectable()
export class MenuService implements IService {

  //constructor(public af: AngularFireDatabase, private loadingService: LoadingService) { }
  constructor(private loadingService: LoadingService) { }

  getId = (): string => 'menu';

  getTitle = (): string => 'UIAppTemplate';

  getAllThemes = (): Array<any> => {
    return [
      {"title" : "ตั้งค่า PIN", "theme"  : "listViews",  "icon" : "ion-ios-test0Icon", "listView" : true, "component": "", "singlePage":true, "pageName": "ProfilePinSettingPage"},
      {"title" : "เปลี่ยนรหัสผ่าน", "theme"  : "listViews",  "icon" : "ion-ios-test0Icon", "listView" : true, "component": "", "singlePage":true, "pageName": "ProfileChangePasswordPage"},
      {"title" : "ออกจากระบบ", "theme"  : "listViews",  "icon" : "ios-log-out-outline", "listView" : true, "component": "", "singlePage":true, "pageName": "ProfilePinPage"}
      //{"title" : "Miss Motor Show", "theme"  : "parallax",  "icon" : "ion-ios-test0Icon", "listView" : false, "component":"", "singlePage":true, "pageName": "PrettyTabPage"},
      //{"title" : "Promrtion", "theme"  : "login",  "icon" : "ion-ios-test0Icon", "listView" : false, "component":"", "singlePage":true, "pageName": "MenuAppPage"}
      //{"title" : "Outline", "theme"  : "register",  "icon" : "icon-comment-account", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Management", "theme"  : "imageGallery",  "icon" : "icon-apps", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Press&Media", "theme"  : "splashScreens",  "icon" : "icon-logout", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Gallery", "theme"  : "checkBoxes",  "icon" : "icon-checkbox-marked", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Exhibitor", "theme"  : "searchBars",  "icon" : "icon-magnify", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "History", "theme"  : "textViews",  "icon" : "icon-tumblr", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Contacts", "theme"  : "wizard",  "icon" : "icon-cellphone-settings", "listView" : false, "component":"", "singlePage":false}
      //{"title" : "Spinner", "theme"  : "spinner",  "icon" : "icon-image-filter-tilt-shift", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Tabs", "theme"  : "tabs",  "icon" : "icon-view-array", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Maps", "theme"  : "maps",  "icon" : "icon-google-maps", "listView" : false, "component":"", "singlePage":false},
      //{"title" : "Scanner", "theme"  : "qrcode",  "icon" : "icon-qrcode", "listView" : false, "component":"", "singlePage":false}
    ];
  };

  getDataForTheme = (menuItem: any) => {
    return {
      //"background": "assets/images/bg/16.jpg",
      "image": "assets/images/bg/logoApp.png",
      "title": "THE 39th BANGKOK INTERNATIONAL MOTOR SHOW 2018"
    };
  };

  getEventsForTheme = (menuItem: any): any => {
    return {};
  };

  prepareParams = (item: any) => {
    return {
      title: item.title,
      data: {},
      events: this.getEventsForTheme(item)
    };
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
      return new Observable(observer => {
        /*
        this.af
          .object('menu')
          .valueChanges()
          .subscribe(snapshot => {
            that.loadingService.hide();
            observer.next(snapshot);
            observer.complete();
          }, err => {
            that.loadingService.hide();
            observer.error([]);
            observer.complete();
          });
          */
      });
    } else {
      return new Observable(observer => {
        that.loadingService.hide();
        observer.next(this.getDataForTheme(item));
        observer.complete();
      });
    }
  }
}
