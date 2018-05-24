import { AdicionarDispositivoBluetoothPage } from './../adicionar-dispositivo-bluetooth/adicionar-dispositivo-bluetooth';
import { ConfiguracoesPage } from './../configuracoes/configuracoes';
import { Dispositivo, ConfiguracaoMQTT, FwMqttProvider, DispositivoBluetooth, DispositivoMQTT, Casa, Comodo, ComandoONOFF, FwBluetoothProvider } from 'fwiotfurb';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { AdicionarDispositivoMqttPage } from './../adicionar-dispositivo-mqtt/adicionar-dispositivo-mqtt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfiguracaoMqttProvider } from '../../providers/configuracao-mqtt/configuracao-mqtt';

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

  listaDispositivosMQTT: Array<Dispositivo> = new Array<Dispositivo>();
  listaDispositivosBluetooth: Array<Dispositivo> = new Array<Dispositivo>();
  configuracaoMQTT: ConfiguracaoMQTT;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fwMqtt: FwMqttProvider,
    public fwBluetooth: FwBluetoothProvider,
    private alertCtrl: AlertController,
    public dbDispositivos: DispositivosFirebaseProvider,
    public configMQTT: ConfiguracaoMqttProvider
  ) {
    this.dbDispositivos.ObterMeusDispositivos().subscribe(dispositivos => {
      dispositivos.forEach(disp => {
        if (disp.TipoDispositivo == "DispositivoMQTT") {
          this.listaDispositivosMQTT.push(disp);
        } else if (disp.TipoDispositivo == "DispositivoBluetooth") {
          this.listaDispositivosBluetooth.push(disp);
        }
      });
    });
    configMQTT.ObterConfiguracao().subscribe(configuracao => {
      this.configuracaoMQTT = configuracao;
      if (this.configuracaoMQTT != null) {
        this.fwMqtt.configurarMQTT(this.configuracaoMQTT);
      }
    })
  }

  adicionarDispositivo() {
    if (this.configuracaoMQTT == null) {
      let alertaConfiguracao = this.alertCtrl.create({
        title: 'Atenção',
        message: 'Não existe nenhuma configuração MQTT. Deseja criar uma?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.navCtrl.setRoot(ConfiguracoesPage);
            }
          },
          {
            text: 'Não',
          }
        ]
      });
      alertaConfiguracao.present();
    }
    else {
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
              } else if (data == 'dispositivoBluetooth') {
                this.navCtrl.push(AdicionarDispositivoBluetoothPage);
              }
            }
          }
        ]
      });

      promptDispositivo.present();
    }
  }

}
