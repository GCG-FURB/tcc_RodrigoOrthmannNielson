import { CasasFirebaseProvider } from './../../providers/casas-firebase/casas-firebase';
import { UsuariosFirebaseProvider } from './../../providers/usuarios-firebase/usuarios-firebase';
import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { ConfiguracaoMqttProvider } from './../../providers/configuracao-mqtt/configuracao-mqtt';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { DispositivoMQTT, DispositivoBluetooth, Dispositivo, ConfiguracaoMQTT, FwMqttProvider, FwBluetoothProvider, ComandoONOFF, Casa, Comodo } from 'fwiotfurb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

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
  casaEstados: Array<Array<boolean>>;
  configuracaoMQTT: ConfiguracaoMQTT;

  public testes: number = 0;
  public statusConexao: number = 0;
  public loading: Loading;
  public loadingConfig: Loading;
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
    public loadingCtrl: LoadingController,
    public dbUsuarios: UsuariosFirebaseProvider,
    private casaDb: CasasFirebaseProvider
  ) {
    this.loadingConfig = this.loadingCtrl.create({
      content: "Carregando configurações"
    });

    this.loadingConfig.present();
    this.timeoutInicializacao();

    auth.adicionarInscricao(configMQTT.ObterConfiguracao().subscribe(configuracao => {
      this.configuracaoMQTT = configuracao;
      if (this.configuracaoMQTT != null) {
        this.loading = this.loadingCtrl.create({
          content: 'Conectando ao MQTT'
        });
        if (!this.fwMqtt.clienteConectado()) {
          this.loading.present();
          this.fwMqtt.configurarMQTT(this.configuracaoMQTT);
          this.timeoutConexaoMQTT();
        }
      }
    }));
  }

  inicializacaoCasa() {
    this.auth.adicionarInscricao(this.dbUsuarios.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
      this.casaEstados = new Array<Array<boolean>>();
      if (casa != null && casa.Comodos != null) {
        this.CasaAtual.Comodos.forEach(comodo => {
          let arrayDisp = new Array<boolean>();
          if (comodo.Dispositivos != null) {
            comodo.Dispositivos.forEach(dispositivo => {
              arrayDisp.push(dispositivo.Estado == (dispositivo.ComandoDispositivo as ComandoONOFF).ON)
            });
          }
          this.casaEstados.push(arrayDisp);
        });
      }
      this.loadingConfig.dismiss();
    }));
  }

  timeoutInicializacao() {
    setTimeout(() => {
      if (!this.dbUsuarios.inicializou()) {
        this.timeoutInicializacao();
      } else {
        this.inicializacaoCasa();
      }
    }, 1000);
  }

  timeoutConexaoMQTT() {
    setTimeout(() => {
      if (!this.fwMqtt.clienteConectado()) {
        this.timeoutConexaoMQTT();
      } else {
        this.loading.dismiss();
      }
    }, 1000);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  mudarEstado(dispositivo: DispositivoMQTT | DispositivoBluetooth, comodo: Comodo) {
    console.log('AAA');
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
      this.casaDb.atualizarDadosCasa(this.CasaAtual);
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
        this.casaDb.atualizarDadosCasa(this.CasaAtual);
      })
    }
  }
}
