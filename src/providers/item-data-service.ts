import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

@Injectable()
export class ItemDataServiceProvider {

  itemsObject: any;
  path: string;

  constructor(private file: File)
  {
    this.path = this.file.externalDataDirectory; //Define the path
    this.checkItemFile();     //Check if the json exists create one if it doesn't
  }

  //Used to pass the json object read to the provider
  setData(data: any)
  {
    this.itemsObject = data;
  }

  //Push a new object to the internal list then immediately saves it to the json
  //Expects it is already in proper format
  addFood(foodOb: any)
  {
      this.itemsObject.Food.push(foodOb);
      this.saveData();
  }

  //Overwrites json with current productList contents
  saveData()
  {
    var jsonText = JSON.stringify(this.itemsObject);
    this.file.writeFile(this.path,'items.json',jsonText,{replace: true});
  }

  //Returns true if the file already exists
  checkItemFile()
  {
    this.file.checkFile(this.path,'items.json').then(exists => {
        //This means the file exists and we can load in the data
        this.readItemFileText();
    }).catch(err => {
        //This means the file doesn't exist and we call to create one
        this.createItemFile();
        this.itemsObject = {'Food':[]}   //Initialize the items object to be empty
        this.saveData();    //save empty structure to file
    })
  }

  //Loads in the json file
  readItemFileText()
  {
    this.file.readAsText(this.path,'items.json').then(text => {
      var json = JSON.parse(text);
      this.setData(json);
    }).catch( err => {
      console.log(err);
    });
  }

  //Creates a blank item.json file, won't overwrite
  createItemFile()
  {
    this.file.createFile(this.path,'items.json',false).then(file =>{

    }).catch(err => {
      console.log(err);
    });
  }

  printToConsole()
  {
    for(var i = 0; i < this.itemsObject.Food.length; ++i)
    {
      console.log(this.itemsObject.Food[i]);
    }
  }
}
