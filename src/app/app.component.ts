import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ModalController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
//import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuService } from '../services/menu-service';
import { AppSettings } from '../services/app-settings';

import { IService } from '../services/IService';

@Component({
  templateUrl: 'app.html',
  providers: [MenuService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = "SlideMenuPage";
  pages: any;
  params: any;
  leftMenuTitle: string;

  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    private menuService: MenuService,
    public modalCtrl: ModalController,
    private themeableBrowser: ThemeableBrowser) {
    // private ga: GoogleAnalytics) {
    this.initializeApp();

    this.pages = menuService.getAllThemes();
    this.leftMenuTitle = menuService.getTitle();
    this.menuService.load(null).subscribe(snapshot => {
      this.params = snapshot;
    });
    if (AppSettings.SHOW_START_WIZARD) {
      this.presentProfileModal();
    }
  }

  presentProfileModal() {
    const profileModal = this.modalCtrl.create("IntroPage");
    profileModal.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      /*
      this.ga.startTrackerWithId('UA-115033532-1')
      .then(() => {
        console.log('Google analytics is ready now');
        //the component is ready and you can call any method here
        this.ga.debugMode();
        this.ga.setAllowIDFACollection(true);
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
      */

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      localStorage.setItem("mailChimpLocal", "true");
      if(JSON.parse(localStorage.getItem("Favorite")) == null){
        localStorage.setItem("Favorite",JSON.stringify([]))
      }
    });
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
      this.nav.setRoot(page.pageName);
    }
  }

  getPageForOpen(value: string): any {
    return null;
  }

  getServiceForPage(value: string): IService {
    return null;
  }
}
