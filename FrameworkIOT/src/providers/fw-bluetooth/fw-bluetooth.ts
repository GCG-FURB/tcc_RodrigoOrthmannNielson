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
   * Ativa o bluetooth do celular
   */
  ativarBluetooth() {
    this.bluetoothSerial.enable()
      .then(() => console.log('Bluetooth ativado'))
      .catch((err) => alert(err));
  }

  /**
   * Valida se existe algum dispositivo conectado
   * @returns {Promise<boolean>} Promise com verdadeiro caso o dispositivo esteja conectado, falso caso contrário
   */
  dispositivoConectado(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.bluetoothSerial.isConnected()
        .then(msg => resolve(msg == "OK"))
        .catch(err => reject(false));
    });
  }

  /**
   * Conecta em um dispositivo
   * @param enderecoMac Endereço MAC do dispositivo
   */
  conectarDispositivo(enderecoMac: string) {
    this.bluetoothSerial.connect(enderecoMac).subscribe();
  }

  /**
   * Envia uma mensagem ao dispositivo conectado atualmente
   * @param mensagem Mensagem a ser enviada
   */
  enviarMensagem(mensagem: string, funcaoSucesso?: () => void, funcaoErro?: () => void) {
    this.bluetoothSerial.write(mensagem.toString())
      .then((success) => funcaoSucesso == undefined? console.log('Enviou a mensagem com sucesso' + success) : funcaoSucesso)
      .catch((err) => funcaoErro == undefined? console.log('Erro ao enviar mensagem' + err) : funcaoErro);
  }

  /**
   * Conecta e envia uma mensagem à um determinado dispositivo. 
   * @param mensagem Mensagem a ser enviada
   * @param enderecoMac Endereço MAC do dispositivo
   */
  conectaEnviaMensagemDispositivo(mensagem: string, enderecoMac: string) {
    this.bluetoothSerial.isConnected()
      .then(msg => msg == "OK")
      .then((conectado) => {
        if (conectado) {
          return this.bluetoothSerial.disconnect();
        }
        return new Promise((resolve) => resolve());
      })
      .then(msg => {
        this.conectarEEnviarMensagemTimeout(mensagem, enderecoMac);
      })
      .catch(err => {
        this.conectarEEnviarMensagemTimeout(mensagem, enderecoMac);
      });
  }

  /**
   * Conecta e envia uma mensagem, aplicando um timeout antes de enviar a mensagem
   * @param mensagem Mensagem a ser enviada
   * @param enderecoMac Endereço MAC do dispositivo
   */
  private conectarEEnviarMensagemTimeout(mensagem: string, enderecoMac: string) {
    this.bluetoothSerial.connect(enderecoMac).subscribe();
    setTimeout(() => {
      this.enviarMensagem(mensagem);
    }, 1000);
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
