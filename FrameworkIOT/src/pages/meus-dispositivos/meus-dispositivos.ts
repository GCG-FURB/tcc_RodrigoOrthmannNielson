import { Dispositivo } from 'fwiotfurb';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { AdicionarDispositivoMqttPage } from './../adicionar-dispositivo-mqtt/adicionar-dispositivo-mqtt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MeusDispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-dispositivos',
  templateUrl: 'meus-dispositivos.html',
})
export class MeusDispositivosPage {

  listaDispositivos: Array<Dispositivo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public dbDispositivos: DispositivosFirebaseProvider) {
    this.listaDispositivos = new Array<Dispositivo>();
    this.dbDispositivos.ObterMeusDispositivos().subscribe(dispositivos => {
      this.listaDispositivos = dispositivos;
    })
  }

  adicionarDispositivo() {
    let promptDispositivo = this.alertCtrl.create({
      title: 'Tipos de dispositivo',
      message: 'Selecione o tipo de dispositivo que deseja adicionar',
      inputs: [
        {
          type: 'radio',
          label: 'Dispositivo bluetooth',
          value: 'dispositivoBluetooth'
        },
        {
          type: 'radio',
          label: 'Dispositivo MQTT',
          value: 'dispositivoMQTT'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Fechar');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            console.log(data);
            if (data == 'dispositivoMQTT') {
              this.navCtrl.push(AdicionarDispositivoMqttPage);
            }
          }
        }
      ]
    });

    promptDispositivo.present();
  }

}
