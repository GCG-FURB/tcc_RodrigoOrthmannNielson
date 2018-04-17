import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { DispositivoBluetooth } from './../../framework/dispositivo/dispositivoBluetooth';

@Injectable()
export class FwBluetoothProvider {

  constructor(
    private platform: Platform,
    private bluetoothSerial: BluetoothSerial,
    private alertCtrl: AlertController
  ) {
  }

  /**
   * Ativa o bluetooth do dispositivo
   */
  ativarBluetooth() {
    this.bluetoothSerial.enable()
      .then(() => console.log('Bluetooth ativado'))
      .catch((err) => alert(err));
  }

  dispositivoConectado() {
    this.bluetoothSerial.isConnected()
      .then((msg) => alert(msg))
      .catch(err => alert(err));
  }

  conectarDispositivo(enderecoMac: string) {
    this.bluetoothSerial.connect(enderecoMac).subscribe();
  }

  enviarMensagem(mensagem: string) {
    if (mensagem == "0") {
      this.bluetoothSerial.write(mensagem.toString()).then((success) => alert(success)).catch((err) => alert(err));
    } else {
      this.bluetoothSerial.write(mensagem.toString()).then((success) => alert(success)).catch((err) => alert(err));
    }
    // if (mensagem.length == 1) {
    //   let numero = +mensagem;
    //   this.bluetoothSerial.write(numero).then((success) => alert(success)).catch((err) => alert(err));
    // } else {
    //   alert(mensagem);
    //   this.bluetoothSerial.write(mensagem).then((success) => alert(success)).catch((err) => alert(err));
    // }
  }

  /**
   * Lista os dispositivos bluetooth e os atribui à uma variável
   * @returns {Promise<Array<DispositivoBluetooth>>} Promise com os dispositivos encontrados, caso sucesso
   */
  listarDispositivosPareados(): Promise<Array<DispositivoBluetooth>> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.list().then(
        (dispositivos) => {
          let dispositivosPareados: Array<DispositivoBluetooth> = new Array<DispositivoBluetooth>();
          dispositivos.forEach(d => {
            dispositivosPareados.push(new DispositivoBluetooth(d.name, d.address, d.id));
          });
          resolve(dispositivosPareados);
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
          let dispositivosNaoPareados: Array<DispositivoBluetooth> = new Array<DispositivoBluetooth>();
          dispositivos.forEach(d => {
            dispositivosNaoPareados.push(new DispositivoBluetooth(d.name, d.address, d.id));
          });
          resolve(dispositivosNaoPareados);
        });
      (err) => {
        reject();
      };
    });
  }
}
