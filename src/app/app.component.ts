import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';

import { PageService } from '../providers/PageService';
import { CalenderPage } from '../pages/calender/calender';
import { ItemDataServiceProvider } from '../providers/item-data-service';
import { ExpirationDataServiceProvider } from '../providers/expiration-data-service';
import { NotifcationServiceProvider } from '../providers/notifcation-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CalenderPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public pageService: PageService, public expirationData: ExpirationDataServiceProvider,public item: ItemDataServiceProvider, public notification: NotifcationServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Clear previous notifications then
    this.notification.clearAllNotifications();
    this.addAllNotifications();
  }

  addAllNotifications()
  {
    var list = this.item.getAllData();

    for(var i=0; i<list.length;i++)
    {
      var notificationDate = this.expirationData.getExpirationDate(list[i].name,list[i].date,list[i].type);
      this.notification.setNotification(i,list[i].name,notificationDate,notificationDate);
    }
  }

  goCalender(){
    this.pageService.goCalender();
  }

  goPicture(){
    this.pageService.goPicture();
  }

  goSettings(){
    this.pageService.goSettings();
  }

  goList(type){
    this.pageService.goHome(type);
  }

  getPage(){
    return (this.pageService.getPage());
  }
}
