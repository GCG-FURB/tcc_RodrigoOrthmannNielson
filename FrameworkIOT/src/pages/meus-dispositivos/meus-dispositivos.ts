import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { AdicionarDispositivoBluetoothPage } from './../adicionar-dispositivo-bluetooth/adicionar-dispositivo-bluetooth';
import { ConfiguracoesPage } from './../configuracoes/configuracoes';
import { Dispositivo, ConfiguracaoMQTT, FwMqttProvider, DispositivoBluetooth, DispositivoMQTT, Casa, Comodo, ComandoONOFF, FwBluetoothProvider } from 'fwiotfurb';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { AdicionarDispositivoMqttPage } from './../adicionar-dispositivo-mqtt/adicionar-dispositivo-mqtt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfiguracaoMqttProvider } from '../../providers/configuracao-mqtt/configuracao-mqtt';
import { UsuariosFirebaseProvider } from '../../providers/usuarios-firebase/usuarios-firebase';
import { MeusComodosPage } from '../meus-comodos/meus-comodos';

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

  listaDispositivosMQTT: Array<Dispositivo>;
  listaDispositivosBluetooth: Array<Dispositivo>;
  configuracaoMQTT: ConfiguracaoMQTT;
  public CasaAtual: Casa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fwMqtt: FwMqttProvider,
    public fwBluetooth: FwBluetoothProvider,
    private alertCtrl: AlertController,
    public dbDispositivos: DispositivosFirebaseProvider,
    public configMQTT: ConfiguracaoMqttProvider,
    private auth: AutenticacaoProvider,
    private usuarioDb: UsuariosFirebaseProvider
  ) {
    this.auth.adicionarInscricao(this.usuarioDb.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
    }));

    this.auth.adicionarInscricao(configMQTT.ObterConfiguracao().subscribe(configuracao => {
      this.configuracaoMQTT = configuracao;
    }));
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
    else if (this.CasaAtual == null || this.CasaAtual.Comodos == null) {
      let alertaComodos = this.alertCtrl.create({
        title: 'Atenção',
        message: 'Não existe nenhum cômodo para essa casa. Deseja adicionar um?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.navCtrl.setRoot(MeusComodosPage);
            }
          },
          {
            text: 'Não',
          }
        ]
      });
      alertaComodos.present();
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
