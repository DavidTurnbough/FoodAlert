import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-Calender',
  templateUrl: 'calender.html'
})

export class CalenderPage{

  constructor(private calendar: Calendar) {
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }
}
