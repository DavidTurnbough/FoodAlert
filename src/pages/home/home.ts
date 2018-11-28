import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ExpirationDataServiceProvider } from '../../providers/expiration-data-service';
import { ItemDataServiceProvider } from '../../providers/item-data-service';

//var items = require("../../data/items.json");

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
  storage = "";
  Today = null;

  constructor(public navParams: NavParams, public exp: ExpirationDataServiceProvider, private itemDataService: ItemDataServiceProvider) {
    this.Type = navParams.get("Type");
    this.itemDataService.isReady().then(ready => {
      this.Food = this.itemDataService.getAllData();
      this.getToday();
    });
  }

  sorTog(s){
    this.sortBy = s;
  }

  getDate(name,date,type){
    if(type == 0)
      this.storage = "counterTop";
    else
      this.storage = 'refrigerator';

    return this.exp.getExpirationDate(name, new Date(date),this.storage);
  }

  getDateForm(date){
      return this.formatDate(new Date(date));
    }

  formatDate(date){
    return date.toLocaleString().split(',')[0];
  }

  getToday(){
    this.Today = new Date();
  }

  toggleStor(item){
    if(item.type == 0)
      item.type = 1;
    else
      item.type = 0;
  }

  removeItem(item)
  {
    this.itemDataService.removeItem(item);
  }
}
