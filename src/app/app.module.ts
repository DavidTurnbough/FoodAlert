import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { PageService } from '../providers/PageService';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalenderPage } from '../pages/calender/calender';
import { PicturePage } from '../pages/picture/picture';
import { SettingsPage } from '../pages/settings/settings';
import { ExpirationDataServiceProvider } from '../providers/expiration-data-service';
import { NotifcationServiceProvider } from '../providers/notifcation-service';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CalenderPage,
    PicturePage,
    SettingsPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalenderPage,
    PicturePage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PageService,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ExpirationDataServiceProvider,
    LocalNotifications,
    NotifcationServiceProvider
  ]
})
export class AppModule {}
