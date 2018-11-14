import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { PageService } from '../../providers/PageService';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Page Variables
  Type = 0;

  constructor(public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toast: Toast) {
    this.Type = navParams.get("Type");
  }

  scan()
  {
    this.barcodeScanner.scan({showTorchButton: true,showFlipCameraButton: true,resultDisplayDuration: 0}).then(barcodeData => {

      this.toast.show(barcodeData.toString(),'2000','center').subscribe(
        toast => {console.log(toast);}
      );

    console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
