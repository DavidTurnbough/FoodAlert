import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { ItemDataServiceProvider } from '../../providers/item-data-service';
import { CalenderPage } from '../../pages/calender/calender';

@Component({
  selector: 'page-Picture',
  templateUrl: 'picture.html'
})

export class PicturePage{

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private toast: Toast, private itemDataService: ItemDataServiceProvider)
  {
  }

  //Calls this everytime the page is entered
  ionViewWillEnter()
  {
    this.barcodeScanner.scan({showTorchButton: true,showFlipCameraButton: true,resultDisplayDuration: 0}).then(barcodeData => {
    this.toast.show(barcodeData.text,'2000','center');
    this.onScan(barcodeData.text);

    this.navCtrl.push( CalenderPage);

    }).catch(err => {
      console.log('Error', err);
      this.navCtrl.push( CalenderPage);
    })
  }

  onScan(text: string)
  {
    var codeData = JSON.parse(text);

    for(var i=0;i<codeData.Food.length;i++)
      this.itemDataService.addFood(codeData.Food[i]);

    console.log('ADDED FOOD! ');
    this.itemDataService.printToConsole();
  }
}
