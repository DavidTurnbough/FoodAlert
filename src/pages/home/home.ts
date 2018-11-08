import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { PageService } from '../../providers/PageService';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Page Variables
  Type = 0;

  constructor(public navParams: NavParams, private qrScanner: QRScanner) {
    this.Type = navParams.get("Type");
  }

  scan()
  {
    console.log('Clicked');

    this.qrScanner.prepare().then((status: QRScannerStatus) =>
    {

      console.log('Status authorized: '+status.authorized);

      if(status.authorized)
      {
        let scansub = this.qrScanner.scan().subscribe((text: string) =>
        {
            console.log('Making progress!!!');
          //this.qrScanner.hide();
          //scansub.unsubscribe();
        });
      }
      else if (status.denied)
      {
      }
      else
      {
      }
    });
  }
}
