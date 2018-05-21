import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdicionarDispositivoBluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-dispositivo-bluetooth',
  templateUrl: 'adicionar-dispositivo-bluetooth.html',
})
export class AdicionarDispositivoBluetoothPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarDispositivoBluetoothPage');
  }

}
