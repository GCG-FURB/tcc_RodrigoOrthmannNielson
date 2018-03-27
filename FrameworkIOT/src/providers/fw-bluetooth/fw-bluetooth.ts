import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';

// Ionic native
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { DispositivoBluetooth } from './../../framework/DispositivoBluetooth';

@Injectable()
export class FwBluetoothProvider {

  private dispositivosPareados: Array<DispositivoBluetooth>;
  private dispositivosNaoPareados: Array<DispositivoBluetooth>

  constructor(
    private platform: Platform,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController
  ) {
    this.dispositivosPareados = new Array<DispositivoBluetooth>();
    this.dispositivosNaoPareados = new Array<DispositivoBluetooth>();
  }

  /**
   * Ativa o bluetooth do dispositivo
   */
  ativarBluetooth() {
    this.bluetoothSerial.enable()
      .then(() => console.log('Bluetooth ativado'))
      .catch((err) => alert(err));
  }

  /**
   * Lista os dispositivos bluetooth e os atribui à uma variável
   * @returns {Promise<Array<DispositivoBluetooth>>} Promise com os dispositivos encontrados, caso sucesso
   */
  listarDispositivosPareados(): Promise<Array<DispositivoBluetooth>> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.list().then(
        (dispositivos) => {
          dispositivos.forEach(d => {
            this.dispositivosPareados.push(new DispositivoBluetooth(d.name, d.address, d.id));
          });
          resolve(this.dispositivosPareados);
        }
      );
      (err) => {
        reject();
      };
    })
  }

  /**
   * Lista os dispositivos bluetooth e os atribui à uma variável
   * @returns {Promise<Array<DispositivoBluetooth>>} Promise com os dispositivos não pareados encontrados, caso sucesso
   */
  listarDispositivosNaoPareados(): Promise<Array<DispositivoBluetooth>> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.discoverUnpaired()
        .then((dispositivos) => {
          dispositivos.forEach(d => {
            this.dispositivosNaoPareados.push(new DispositivoBluetooth(d.name, d.address, d.id));
          });
          resolve(this.dispositivosNaoPareados);
        }
        );
      (err) => {
        reject();
      };
    });
  }
}
