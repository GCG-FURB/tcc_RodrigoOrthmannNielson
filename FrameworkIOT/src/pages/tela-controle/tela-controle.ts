import { CasasFirebaseProvider } from './../../providers/casas-firebase/casas-firebase';
import { UsuariosFirebaseProvider } from './../../providers/usuarios-firebase/usuarios-firebase';
import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { ConfiguracaoMqttProvider } from './../../providers/configuracao-mqtt/configuracao-mqtt';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { DispositivoMQTT, DispositivoBluetooth, Dispositivo, ConfiguracaoMQTT, FwMqttProvider, FwBluetoothProvider, ComandoONOFF, Casa, Comodo, ComandoDispositivo } from 'fwiotfurb';
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
  public ListaComodos: Array<Comodo>;

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
    this.inicializacaoMqtt();
  }

  /**
   * Inicializa a conexão MQTT.
   */
  private inicializacaoMqtt() {
    this.auth.adicionarInscricao(this.configMQTT.ObterConfiguracao().subscribe(configuracao => {
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

  /**
   * Inicializa a casa
   */
  private inicializacaoCasa() {
    this.auth.adicionarInscricao(this.dbUsuarios.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
      this.ListaComodos = new Array<Comodo>();
      this.casaEstados = new Array<Array<boolean>>();
      if (casa != null && casa.Comodos != null) {
        this.atualizarListaEstadosCasa();
      }
      this.loadingConfig.dismiss();
    }));
  }

  /**
   * Atualiza a lista de estados da casa
   */
  private atualizarListaEstadosCasa() {
    this.CasaAtual.Comodos.forEach(comodo => {
      this.ListaComodos.push(comodo);
      let arrayDisp = new Array<boolean>();
      if (comodo.Dispositivos != null) {
        comodo.Dispositivos.forEach(dispositivo => {
          arrayDisp.push(dispositivo.Estado == (dispositivo.ComandoDispositivo as ComandoONOFF).ON)
        });
      }
      this.casaEstados.push(arrayDisp);
    });
  }

  /**
   * Timeout para inicialização do usuário
   */
  timeoutInicializacao() {
    setTimeout(() => {
      if (!this.dbUsuarios.inicializou()) {
        this.timeoutInicializacao();
      } else {
        this.inicializacaoCasa();
      }
    }, 1000);
  }

  /**
   * Timeout para a conexão com o MQTT.
   */
  private timeoutConexaoMQTT() {
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

  /**
   * Muda o estado de um dispositivo mqtt e envia o comando para o dispositivo
   */
  mudarEstadoDispositivoMqtt(dispositivoMqtt: DispositivoMQTT, comandoONOFF: ComandoONOFF) {
    if (dispositivoMqtt.Estado == comandoONOFF.OFF) {
      this.fwMqtt.publicar(comandoONOFF.ON, dispositivoMqtt.TopicoPublicacao);
      dispositivoMqtt.Estado = comandoONOFF.ON;
    } else {
      this.fwMqtt.publicar(comandoONOFF.OFF, dispositivoMqtt.TopicoPublicacao);
      dispositivoMqtt.Estado = comandoONOFF.OFF;
    }
    this.casaDb.atualizarDadosCasa(this.CasaAtual);
  }

  /**
   * Muda o estado de um dispositivo bluetooth e envia o comando para o dispositivo
   */
  mudarEstadoDispositivoBluetooth(dispositivoBluetooth: DispositivoBluetooth, comandoONOFF: ComandoONOFF) {
    this.fwBluetooth.ativarBluetooth().then(() => {
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

  /**
   * Muda o estado de um dispositivo ONOFF. Invertendo o estado.
   * @param dispositivo dispositivo mqtt ou bluetooth
   * @param comodo comodo a qual pertence o dispositivo
   */
  mudarEstado(dispositivo: DispositivoMQTT | DispositivoBluetooth, comodo: Comodo) {
    let estadoCasaEstados = this.obterEstadoDispositivoCasaEstados(dispositivo, comodo);
    let comandoDisp = dispositivo.ComandoDispositivo as ComandoONOFF;
    if (estadoCasaEstados && dispositivo.Estado == comandoDisp.OFF || !estadoCasaEstados && dispositivo.Estado == comandoDisp.ON) {
      if (dispositivo.TipoDispositivo == "DispositivoMQTT") {
        this.mudarEstadoDispositivoMqtt(dispositivo as DispositivoMQTT, comandoDisp);
      } else if (dispositivo.TipoDispositivo == "DispositivoBluetooth") {
        this.mudarEstadoDispositivoBluetooth(dispositivo as DispositivoBluetooth, comandoDisp);
      }
    }
  }

  /**
   * Obtém o estado da lista de estados da casa atual
   * @param dispositivo dispositivo mqtt ou bluetooth
   * @param comodo comodo a qual pertence o dispositivo
   */
  obterEstadoDispositivoCasaEstados(dispositivo: DispositivoMQTT | DispositivoBluetooth, comodo: Comodo) {
    let indexComodo = this.CasaAtual.Comodos.indexOf(comodo);
    let indexDisp = this.CasaAtual.Comodos[indexComodo].Dispositivos.indexOf(dispositivo);
    return (this.casaEstados[indexComodo])[indexDisp];
  }
}
