import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage{

  status="On";
  constructor(public navCtrl: NavController) {
  }

  changeStatus(){
    if(this.status === "On"){
      this.status = "Off";
    }
    else
    {
      this.status = "On";
    }
    document.getElementById("toggle").innerHTML = this.status;
  }
}
