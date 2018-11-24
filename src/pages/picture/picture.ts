import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast'

@Component({
  selector: 'page-Picture',
  templateUrl: 'picture.html'
})

export class PicturePage{

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private toast: Toast) {
  }

  ionViewWillEnter()
  {
    this.barcodeScanner.scan({showTorchButton: true,showFlipCameraButton: true,resultDisplayDuration: 0}).then(barcodeData => {
      this.toast.show(barcodeData.text,'2000','center').subscribe(
        toast => {console.log(toast);}
        );

    this.navCtrl.pop(); //Goes back to the previous page

    }).catch(err => {
      console.log('Error', err);
    });
  }

}
