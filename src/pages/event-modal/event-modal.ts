import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: true };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let currentDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = currentDate;
    this.event.endTime = currentDate;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
