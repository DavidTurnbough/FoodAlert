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

  constructor(public pageService: PageService, public navParams: NavParams) {
    this.Type = navParams.get("Type");
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
}
