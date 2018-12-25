import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Facebook } from '@ionic-native/facebook';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';

//import { AppSettings } from '../services/app-settings'
import { ToastService } from '../services/toast-service'
import { LoadingService } from '../services/loading-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { GoogleAnalytics } from '@ionic-native/google-analytics';

//import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register';
import { ItemsPage } from '../pages/items/items';
import { ApiProvider } from '../providers/api/api';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Geolocation } from '@ionic-native/geolocation';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

export function authHttpServiceFactory(http: Http) {
    return new AuthHttp(new AuthConfig({
      headerPrefix: 'Bearer',
      tokenName: 'access_token',
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: false,
      noTokenScheme: true,
      tokenGetter: (() => localStorage.getItem('access_token'))
    }), http);
  }

@NgModule({
    declarations: [
        MyApp, ItemsPage

    ],
    /*
    providers: [
        BarcodeScanner, StatusBar, SplashScreen,
        ToastService, LoadingService, GoogleAnalytics,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ],
    */
    providers: [
        BarcodeScanner, StatusBar, SplashScreen,
        ToastService, LoadingService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ThemeableBrowser,
        Facebook,
        GooglePlus,
        TwitterConnect,
        ApiProvider,
        Geolocation,
        DatePipe,
        {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
        InAppBrowser,
        StreamingMedia
        //GoogleAnalytics
    ],
    /*
    imports: [ 
    MbscModule, 
    FormsModule, 
        BrowserModule,
        HttpModule,
        AngularFireModule.initializeApp(AppSettings.FIREBASE_CONFIG),
        AngularFireDatabaseModule, AngularFireAuthModule,
        IonicModule.forRoot(MyApp),
    ],
    */
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
          navExitApp: false
        }),
        HttpClientModule,
        IonicImageViewerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, ItemsPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
