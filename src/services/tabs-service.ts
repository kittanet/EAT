import { IService } from './IService';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './app-settings'
import { LoadingService } from './loading-service'

@Injectable()
export class TabsService implements IService {

  //constructor(public af: AngularFireDatabase, private loadingService: LoadingService) { }
  constructor(private loadingService: LoadingService) { }

  getId = (): string => 'tabs';

  getTitle = (): string => 'Tabs';

  getAllThemes = (): Array<any> => {
    return [
      { "title": "Footer tab - text", "theme": "layout1" },
      { "title": "Footer tab - icons", "theme": "layout2" },
      { "title": "Header tab - text", "theme": "layout3" }
    ];
  };

  getEventsForTheme = (menuItem: any): any => {
    return {};
  };

  getDataForTheme = (menuItem: any): any => {
    return this[
      'getDataFor' +
      menuItem.charAt(0).toUpperCase() +
      menuItem.slice(1)
    ]();
  };

  getDataForTab1 = (): any => {
    return {
      "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F5.jpg?alt=media&token=d296522d-8e91-45f0-b4df-300edff801ce",
      "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      "title" : "Fragment Example 1"
    };
  }

  getDataForTab2 = (): any => {
    return {
      "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F6.jpg?alt=media&token=7adb654c-d7f7-4f55-8eec-84d72f903868",
      "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      "title" : "Fragment Example 2"
    };
  }

  getDataForTab3 = (): any => {
      return {
        "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F7.jpg?alt=media&token=f8001ed6-990f-4bab-9588-038ef2091fb6",
        "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        "title" : "Fragment Example 3"
      };
  }

  getDataForTab4 = (): any => {
      return {
        "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F5.jpg?alt=media&token=d296522d-8e91-45f0-b4df-300edff801ce",
        "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        "title" : "Fragment Example 4"
      };
  }

  getDataForTab5 = (): any => {
    return {
      "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F6.jpg?alt=media&token=7adb654c-d7f7-4f55-8eec-84d72f903868",
      "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      "title" : "Fragment Example 5"
    };
  }

  getDataForTab6 = (): any => {
      return {
        "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/ionic2blue.appspot.com/o/avatar-large%2F7.jpg?alt=media&token=f8001ed6-990f-4bab-9588-038ef2091fb6",
        "description" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        "title" : "Fragment Example 6"
      };
  };

  getShowItemId = (item: any): string => {
    return this.getId() + item.theme.charAt(0).toUpperCase() + "" + item.theme.slice(1);
  };

  prepareParams = (item: any) => {
    let result = {
      title: item.title,
      data: [],
      events: this.getEventsForTheme(item)
    };
    result[this.getShowItemId(item)] = true;
    return result;
  };

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    if (AppSettings.IS_FIREBASE_ENABLED) {
        return new Observable(observer => {
          /*
            this.af
                .object('tab/' + item)
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
  };
}
