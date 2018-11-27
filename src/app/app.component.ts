import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';

import { PageService } from '../providers/PageService';
import { CalenderPage } from '../pages/calender/calender';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CalenderPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public pageService: PageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
