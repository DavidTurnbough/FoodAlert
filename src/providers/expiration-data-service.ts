import { Injectable } from '@angular/core';
//import JSONData from '../data/expirationTimes.json';

@Injectable()
export class ExpirationDataServiceProvider {

  productList: any;

  constructor()
  {
//    this.productList = JSONData.items;

    var data = require('../data/expirationTimes.json');

    this.setData(data);
  }

  // Sets the data from the expiration file
  setData(data: any)
  {
    this.productList = data.items;
  }

  // Returns the expiration time, in days, given the product name and storage method.
  getExpirationTime(productName: string, storageMethod: string)
  {
    var expirationTime: number = 0;

    for(var i = 0; i < this.productList.length; ++i)
    {
      if(this.productList[i].name === productName){
        if(storageMethod === 'counterTop'){
          expirationTime = this.productList[i].counterTop;
        }
        else{
          expirationTime = this.productList[i].refrigerator;
        }
      }
    }

    return expirationTime;
  }

  //Returns the date of expiration, given the product name, purchase date, and
  //  storage method.
  getExpirationDate(productName: string, purchaseDate: Date, storageMethod: string)
  {
    return new Date(purchaseDate.setDate(purchaseDate.getDate() +
      this.getExpirationTime(productName, storageMethod)));
  }

  //Print the product expiration information to the console.
  printToConsole()
  {
    for(var i = 0; i < this.productList.length; ++i)
    {
      console.log(this.productList[i]);
    }
  }

}
