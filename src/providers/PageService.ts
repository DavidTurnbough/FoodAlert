import { Injectable } from "@angular/core";
import { App } from "ionic-angular";

import { CalenderPage } from '../pages/calender/calender';
import { SettingsPage } from '../pages/settings/settings';
import { PicturePage } from '../pages/picture/picture';


@Injectable()
export class PageService {
  constructor(public app: App) {
  }

  goCalender(){
    let nav = this.app.getActiveNav();
    nav.push( CalenderPage );
  }

  goHome(key){
    let nav = this.app.getActiveNav();
    nav.goToRoot({},{Type: key});
  }

  goPicture(){
    let nav = this.app.getActiveNav();
    nav.push( PicturePage );
  }

  goSettings(){
    let nav = this.app.getActiveNav();
    nav.push( SettingsPage );
  }

}
