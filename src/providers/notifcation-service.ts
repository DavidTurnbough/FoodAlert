import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class NotifcationServiceProvider {

  hasPermission: boolean;
  notificationsAllowed: boolean;


  constructor( private platform: Platform, private localNotifications: LocalNotifications) {
    this.hasPermission = false;
    this.notificationsAllowed = true;
  }

  // set a notification
  setNotification(notificationID: number, product: string, expirationDate: Date, notificationDate: Date){
    if(this.notificationsAllowed){
      this.platform.ready().then(() => {
          this.localNotifications.schedule({
            id: notificationID,
            title: product,
            text: 'Expires: ' + this.formatDate(expirationDate),
            trigger: {at: notificationDate},
            color: 'FF0000',
            launch: true,
            foreground: true,
            icon: 'file://assets/icon/favicon.ico'
        });
      });
    }
  }

  // clear notifications.
  clearNotification(notificationID){
    this.localNotifications.clear(notificationID);
  }

  // clear all notifications.
  clearAllNotifications(){
    this.localNotifications.clearAll();
  }

  // check to see if a notification is scheduled
  isScheduled(notificationID){
    return this.localNotifications.isScheduled(notificationID);
  }

  // get permission for notification display
  getNotificationPermission(){
    this.localNotifications.requestPermission();
  }

  // checks to see if notification permission is granted.
  hasNotificationPermission(){
    return this.localNotifications.hasPermission();
  }

  // allows notification scheduling.
  turnNotificationsOn(){
    this.notificationsAllowed = true;
  }

  // disables notification scheduling.
  turnNotificationsOff(){
    this.notificationsAllowed = false;
  }

  // format date for notification output.
  formatDate(date: Date){
    var dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    var monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    var dayIndex = date.getDay();
    var monthIndex = date.getMonth();
    var dateOfMonth = date.getDate();
    var year = date.getFullYear();

    return dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateOfMonth + ', ' + + year;
  }
}
