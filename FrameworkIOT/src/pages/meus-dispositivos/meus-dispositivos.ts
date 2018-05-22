import { ConfiguracoesPage } from './../configuracoes/configuracoes';
import { Dispositivo, ConfiguracaoMQTT, FwMqttProvider, DispositivoBluetooth, DispositivoMQTT, ComandoONOFF, Casa, Comodo } from 'fwiotfurb';
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

  listaDispositivos: Array<Dispositivo>;
  configuracaoMQTT: ConfiguracaoMQTT;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fwMqtt: FwMqttProvider, private alertCtrl: AlertController, public dbDispositivos: DispositivosFirebaseProvider, public configMQTT: ConfiguracaoMqttProvider) {
    this.listaDispositivos = new Array<Dispositivo>();
    this.dbDispositivos.ObterMeusDispositivos().subscribe(dispositivos => {
      this.listaDispositivos = dispositivos;
    });
    configMQTT.ObterConfiguracao().subscribe(configuracao => {
      this.configuracaoMQTT = configuracao;
      if (this.configuracaoMQTT != null) {
        this.fwMqtt.configurarMQTT(this.configuracaoMQTT);
      }
    })
  }

  mudarEstado(dispositivo: DispositivoMQTT | DispositivoBluetooth) {
    if (dispositivo.TipoDispositivo == "DispositivoMQTT") {
      let dispositivoMqtt = dispositivo as DispositivoMQTT;
      let comandoONOFF = dispositivo.ComandoDispositivo as ComandoONOFF;
      if (dispositivoMqtt.Estado == comandoONOFF.OFF) {
        this.fwMqtt.publicar(comandoONOFF.ON, dispositivoMqtt.TopicoPublicacao);
        dispositivoMqtt.Estado = comandoONOFF.ON;
      } else {
        this.fwMqtt.publicar(comandoONOFF.OFF, dispositivoMqtt.TopicoPublicacao);
        dispositivoMqtt.Estado = comandoONOFF.OFF;
        //this.dbDispositivos.
      }
    } else if (dispositivo.TipoDispositivo == "DispositivoBluetooth") {
    }
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
              }
            }
          }
        ]
      });

      promptDispositivo.present();
    }
  }

}
