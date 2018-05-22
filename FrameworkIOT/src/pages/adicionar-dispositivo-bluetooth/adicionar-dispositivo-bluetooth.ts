import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FwBluetoothProvider, DispositivoBluetooth } from 'fwiotfurb';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';

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

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  public listaDispositivosNaoPareados: Array<DispositivoBluetooth>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fwBluetooth: FwBluetoothProvider,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
    this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  }

  obterListaPrompt(): Array<AlertInputOptions> {
    let listaInputs: Array<AlertInputOptions> = new Array<AlertInputOptions>();

    this.listaDispositivosPareados.forEach(dispositivo => {
      let input: AlertInputOptions = {
        type: 'radio',
        label: dispositivo.Nome,
        value: dispositivo.EnderecoMAC
      }
      listaInputs.push(input)
    });

    this.listaDispositivosNaoPareados.forEach(dispositivo => {
      let input: AlertInputOptions = {
        type: 'radio',
        label: dispositivo.Nome,
        value: dispositivo.EnderecoMAC
      }
      listaInputs.push(input)
    });

    return listaInputs;
  }

  buscarDispositivo() {
    let promptDispositivo = this.alertCtrl.create({
      title: 'Tipos de dispositivo',
      message: 'Selecione o tipo de dispositivo que deseja adicionar',
      inputs: this.obterListaPrompt(),
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
          }
        }
      ]
    });

    promptDispositivo.present();
  }

  listarDispositivosPareados(): void {
    this.fwBluetooth.listarDispositivosPareados()
      .then((dispositivos) => {
        this.listaDispositivosPareados = dispositivos;
      });
  }

  listarDispositivosNaoPareados(): void {
    this.fwBluetooth.listarDispositivosNaoPareados()
      .then((dispositivos) => this.listaDispositivosNaoPareados = dispositivos);
  }

}
