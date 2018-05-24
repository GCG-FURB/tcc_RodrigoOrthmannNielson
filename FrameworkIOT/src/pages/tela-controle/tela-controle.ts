import { ConfiguracaoMqttProvider } from './../../providers/configuracao-mqtt/configuracao-mqtt';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { DispositivoMQTT, DispositivoBluetooth, Dispositivo, ConfiguracaoMQTT, FwMqttProvider, FwBluetoothProvider, ComandoONOFF } from 'fwiotfurb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the TelaControlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tela-controle',
  templateUrl: 'tela-controle.html',
})
export class TelaControlePage {


  listaDispositivosMQTT: Array<Dispositivo>;
  listaEstadoDispositivosMQTT: Array<boolean>;
  listaDispositivosBluetooth: Array<Dispositivo>;
  listaEstadoDispositivosBluetooth: Array<boolean>;
  configuracaoMQTT: ConfiguracaoMQTT;

  public testes: number = 0;

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
      this.listaDispositivosMQTT = new Array<Dispositivo>();
      this.listaEstadoDispositivosMQTT = new Array<boolean>();
      this.listaDispositivosBluetooth = new Array<Dispositivo>();
      this.listaEstadoDispositivosBluetooth = new Array<boolean>();

      dispositivos.forEach(disp => {
        if (disp.TipoDispositivo == "DispositivoMQTT") {
          this.listaDispositivosMQTT.push(disp);
          this.listaEstadoDispositivosMQTT.push(disp.Estado == (disp.ComandoDispositivo as ComandoONOFF).ON)
        } else if (disp.TipoDispositivo == "DispositivoBluetooth") {
          this.listaDispositivosBluetooth.push(disp);
          this.listaEstadoDispositivosBluetooth.push(disp.Estado == (disp.ComandoDispositivo as ComandoONOFF).ON)
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

  trackByIndex(index: number, obj: any): any {
    return index;
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
      }
      let index = this.listaDispositivosMQTT.indexOf(dispositivoMqtt);
      this.listaEstadoDispositivosMQTT[index] = dispositivoMqtt.Estado == comandoONOFF.ON;
      this.dbDispositivos.AtualizarEstadoDispositivo(dispositivoMqtt);
    } else if (dispositivo.TipoDispositivo == "DispositivoBluetooth") {
      this.fwBluetooth.ativarBluetooth().then(() => {
        let dispositivoBluetooth = dispositivo as DispositivoBluetooth;
        let comandoONOFF = dispositivo.ComandoDispositivo as ComandoONOFF;
        if (dispositivoBluetooth.Estado == comandoONOFF.OFF) {
          this.fwBluetooth.conectaEnviaMensagemDispositivo(comandoONOFF.ON, dispositivoBluetooth.EnderecoMAC);
          dispositivoBluetooth.Estado = comandoONOFF.ON;
        } else {
          this.fwBluetooth.conectaEnviaMensagemDispositivo(comandoONOFF.OFF, dispositivoBluetooth.EnderecoMAC);
          dispositivoBluetooth.Estado = comandoONOFF.OFF;
        }
        let index = this.listaDispositivosBluetooth.indexOf(dispositivoBluetooth);
        this.listaEstadoDispositivosBluetooth[index] = dispositivoBluetooth.Estado == comandoONOFF.ON;
        this.dbDispositivos.AtualizarEstadoDispositivo(dispositivoBluetooth);
      })
    }
  }
}
