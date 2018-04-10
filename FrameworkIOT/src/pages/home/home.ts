import { ConfiguracaoMQTT } from './../../framework/configuracaoMQTT';
import { FwMqttProvider } from './../../providers/fw-mqtt/fw-mqtt';
import { DispositivoBluetooth } from './../../framework/dispositivoBluetooth';
import { FwBluetoothProvider } from './../../providers/fw-bluetooth/fw-bluetooth';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  public listaDispositivosNaoPareados: Array<DispositivoBluetooth>;
  public conectado: DispositivoBluetooth;

  constructor(private platform: Platform, public navCtrl: NavController, private fwBluetooth: FwBluetoothProvider, private fwMQTT: FwMqttProvider) {
    this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  }

  listarDispositivosPareados(): void {
    this.fwBluetooth.listarDispositivosPareados()
      .then((dispositivos) => this.listaDispositivosPareados = dispositivos);
  }

  listarDispositivosNaoPareados(): void {
    this.fwBluetooth.listarDispositivosNaoPareados()
      .then((dispositivos) => this.listaDispositivosNaoPareados = dispositivos);
  }

  pressionado(dispositivo: DispositivoBluetooth) {
    alert(dispositivo.Nome);
  }

  conectar(dispositivo: DispositivoBluetooth) {
    this.fwBluetooth.conectarDispositivo(dispositivo.EnderecoMAC);
  }

  testeMQTT() {
    let conectou = (): void => {
      console.log('COnseguiu conectarrr');
    }

    let configuracao: ConfiguracaoMQTT = {
      hostname: 'm13.cloudmqtt.com',
      porta: 36956,
      idCliente: '123',
      conectou: conectou,
      configuracaoAutenticacao: {
        usuario: "ssjuptjm",
        senha: "ILeD0JPvmVFO"
      }
    };

    this.fwMQTT.configurarMQTT(configuracao);
  }


  publicarMqtt() {
    this.fwMQTT.publicar('oioi', '/teste');
  }

  inscreverMqtt() {
    this.fwMQTT.inscrever('/teste');
  }

  desinscreverMqtt() {
    this.fwMQTT.desinscrever('/teste');
  }

}


