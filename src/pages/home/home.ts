import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { PageService } from '../../providers/PageService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Page Variables
  Type = 0;

  constructor(public navParams: NavParams) {
    this.Type = navParams.get("Type");
  }


}
