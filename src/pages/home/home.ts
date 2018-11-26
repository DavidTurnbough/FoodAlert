import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ExpirationDataServiceProvider } from '../../providers/expiration-data-service';
var items = require("../../data/items.json");

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Page Variables
  Type = 0;
  sortBy = 'none';
  down = false;
  Food = null;

  constructor(public navParams: NavParams, public exp: ExpirationDataServiceProvider) {
    this.Type = navParams.get("Type");
    this.Food = items.Food;
  }

  sorTog(s){
    this.sortBy = s;
  }

  /*getDate(name,date,type){

    this.exp.getExpirationDate();
    document.write("<p>" + Date() + "</p>");
  } */
}
