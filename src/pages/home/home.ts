import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map'

/**
 *
 * @home.ts
 * Date: Tuesday February 22nd 2017
 * Author: Nicholas Rowlandson (200167125)
 * Description: This is all functionality for Midterm frontend
 *
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // PROPERTIES
  items: FirebaseListObservable<any>;
  completed: FirebaseListObservable<any>;
  itemLength: any;
  completedLength: any;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    af:AngularFire) {
    this.items = af.database.list('/items');
    this.items.map(list=>list.length).subscribe(length=>this.itemLength = length);

    this.completed = af.database.list('/items', {
       query: {
         orderByChild: 'done',
         equalTo: true
       }
     });
     this.completed.map(list=>list.length).subscribe(length=>this.completedLength = length);
  }

  //METHODS
  // Add an item to the list. The folowing code will present a popup requesting input of to do name
  addItem(){
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Enter a name and qty for this item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'qty',
          placeholder: 'Qty'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.push({
              title: data.title,
              qty: data.qty,
              favourite: false
            });
          }
        }
      ]
    });
    prompt.present();
  }

  //Add 1 to qty
  addQty(itemId, currentQty){
    currentQty++;
    this.items.update(itemId, {
      qty: currentQty
    });
  }

  //Remove 1 from qty
  removeQty(itemId, currentQty){
    currentQty--;
    if(currentQty != 0){
      this.items.update(itemId, {
        qty: currentQty
      });
    }
  }

  //Remove to do from list.
  removeItem(itemId: string){
    this.items.remove(itemId);
  }

  //Update the to do.
  updateItem(itemId, itemTitle, itemQty){
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Update the name and qty for this item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: itemTitle
        },
        {
          name: 'qty',
          placeholder: 'Qty',
          value: itemQty
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.update(itemId, {
              title: data.title,
              qty: data.qty
            });
          }
        }
      ]
    });
    prompt.present();
  }

  //Update fvourite status
  updateFavourite(itemId, favourite){
    if(favourite == true){
      this.items.update(itemId, {
        favourite: false
      });
    }else{
      this.items.update(itemId, {
        favourite: true
      });
    }
  }

}
