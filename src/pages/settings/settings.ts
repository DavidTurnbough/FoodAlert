import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NotifcationServiceProvider } from '../../providers/notifcation-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage{

  status="On";
  constructor(public navCtrl: NavController, public notify: NotifcationServiceProvider) {
  }

  changeStatus(){
    if(this.status === "On"){
      this.status = "Off";
      this.notify.turnNotificationsOff();
    }
    else
    {
      this.status = "On";
      this.notify.turnNotificationsOn();
    }
    document.getElementById("toggle").innerHTML = this.status;
  }
}
