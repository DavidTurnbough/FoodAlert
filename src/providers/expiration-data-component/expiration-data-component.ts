import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { ExpirationDataServiceProvider } from '../expiration-data-service/expiration-data-service';
import { IProduct } from './productExpirationDetails';

@Injectable()
export class ExpirationDataComponentProvider implements OnInit
{

  productList: IProduct[] =
    [
        {name:"Apple", counterTop:14, refrigerator:30},
        {name:"Avocado", counterTop:3, refrigerator:7},
        {name:"Banana", counterTop:2, refrigerator:2}
      ];

  constructor(private expirationDataServiceProvider: ExpirationDataServiceProvider)
  {
  }

  ngOnInit(){
    this.expirationDataServiceProvider.getExpirationData()
      .subscribe(
        data => this.productList = data);
  }

  //Load product information from local json file.
  getLocalData()
  {
    this.expirationDataServiceProvider.getExpirationData()
      .subscribe(
        data => this.productList = data);
  }

//!! Cannot figure out how to use the passed string directly to pull the needed
//!!  expiration time.
  //Returns the expiration time, in days, given the product name and storage method.
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
    console.log('Name: \tCounter Top: \tRefrigerated:');
    for(var i = 0; i < this.productList.length; ++i)
    {
      console.log(this.productList[i].name + '\t' + this.productList[i].counterTop +
        '\t' + this.productList[i].refrigerator);
    }
  }

}
