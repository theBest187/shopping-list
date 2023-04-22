import { Component, inject } from '@angular/core';
import { AlertController, RefresherCustomEvent, ToastController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shoppingList = JSON.parse(localStorage.getItem('items')) || [];
   constructor(private alertController: AlertController,
    private toastController: ToastController){}

   async addItem(){
    const alert = await this.alertController.create({
      header: 'Neues Element hinzufügen',
      buttons: [{
        text: 'Hinzufügen',
        handler: (textfields) => {
          this.shoppingList.push(textfields[0]);
          this.save();
        }
      }],
      inputs: [
        {
          placeholder: 'Neues Element',
        }
      ],
    });

    await alert.present();
  }
  deleteItem(i){
    this.shoppingList.splice(i, 1);
    this.presentToast('Das Element wurde gelöscht!');
    let itemsAsText = JSON.stringify(this.shoppingList);
    localStorage.setItem('items', itemsAsText);
  }
  save(){
    this.presentToast('Das Element wurde hinzugefügt!');
    let itemsAsText = JSON.stringify(this.shoppingList);
    localStorage.setItem('items', itemsAsText);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
}
