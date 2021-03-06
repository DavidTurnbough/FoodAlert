import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

@Injectable()
export class ItemDataServiceProvider {

  itemsObject: any;
  path: string;
  fileReady = false;

  constructor(private file: File)
  {
    this.path = this.file.externalDataDirectory; //Define the path
    this.checkItemFile();     //Check if the json exists create one if it doesn't
  }

  //
  isReady(): Promise<boolean>
  {
    return new Promise<boolean>(resolve => {
            setTimeout(() => {
                resolve(this.fileReady);
            },1000);
        });
  }

  //Used to pass the json object read to the provider
  setData(data: any)
  {
    this.itemsObject = data;
  }

  //Passes object to calendar
  getData(item: number)
  {
    return this.itemsObject.Food[item];
  }

  getAllData()
  {
    return this.itemsObject.Food;
  }

  //
  getFoodNum()
  {
    return this.itemsObject.Food.length;
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
        this.fileReady = true;
    }).catch(err => {
        //This means the file doesn't exist and we call to create one
        this.createItemFile();
        this.itemsObject = {'Food':[]}   //Initialize the items object to be empty
        this.saveData();    //save empty structure to file
        this.fileReady = true;
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

  removeItem(foodOb: any)
  {
    for(let i = 0; i < this.itemsObject.Food.length; i++)
    {
      if(this.itemsObject.Food[i].name == foodOb.name && this.itemsObject.Food[i].date == foodOb.date)
      {
          this.itemsObject.Food.splice(i,1);
          break;
      }
    }

    this.saveData();
  }
}
