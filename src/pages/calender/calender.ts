import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import {ExpirationDataServiceProvider } from '../../providers/expiration-data-service';
import { ItemDataServiceProvider } from '../../providers/item-data-service';

var list: any; //= require( '../../data/items.json');

@Component({
  selector: 'page-Calender',
  templateUrl: 'calender.html'
})
export class CalenderPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private itemDataService: ItemDataServiceProvider, private modalCtrl: ModalController, private alertCtrl: AlertController, public exp: ExpirationDataServiceProvider) {
    list = this.itemDataService.getData();
    let items = list.Food;

    for (let i= 0; i<items.length; i++)
    {
      let storage = '';
      if(items[i].type == "1")
      {
        storage = 'refrigerator';
      }
      else
      {
        storage = 'counterTop';
      }
      this.addExpirationEvent(items[i].name, new Date(items[i].date), storage);
    }

  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  addExpirationEvent(food, date, storage) {

    let start = new Date(this.exp.getExpirationDate(food, date, storage));
    let end = start;

    let event = {
      title: food,
      startTime: start,
      endTime: end,
      allDay: true
    };

    let events = this.eventSource;
    events.push(event);

    //this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}
