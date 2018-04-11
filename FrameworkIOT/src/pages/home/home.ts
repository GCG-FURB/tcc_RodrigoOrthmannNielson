import { FwComunicacaoProvider } from './../../providers/fw-comunicacao/fw-comunicacao';
import { ConfiguracaoMQTT } from './../../framework/configuracaoMQTT';
import { FwMqttProvider } from './../../providers/fw-mqtt/fw-mqtt';
import { DispositivoBluetooth } from './../../framework/dispositivo/dispositivoBluetooth';
import { FwBluetoothProvider } from './../../providers/fw-bluetooth/fw-bluetooth';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  public listaDispositivosNaoPareados: Array<DispositivoBluetooth>;
  public conectado: DispositivoBluetooth;

  constructor(private fwComunicacao: FwComunicacaoProvider) {
    //this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  }

  listarDispositivosPareados(): void {
    this.fwComunicacao.fwBluetooth.listarDispositivosPareados()
      .then((dispositivos) => this.listaDispositivosPareados = dispositivos);
  }

  listarDispositivosNaoPareados(): void {
    this.fwComunicacao.fwBluetooth.listarDispositivosNaoPareados()
      .then((dispositivos) => this.listaDispositivosNaoPareados = dispositivos);
  }

  pressionado(dispositivo: DispositivoBluetooth) {
    alert(dispositivo.Nome);
  }

  conectar(dispositivo: DispositivoBluetooth) {
    this.fwComunicacao.fwBluetooth.conectarDispositivo(dispositivo.EnderecoMAC);
  }

  public checado: boolean = true;

  testeMQTT() {
    let conectou = (): void => {
      console.log('COnseguiu conectarrr');
    }

    let mensagemRecebida = (mensagem: Paho.MQTT.Message): void => {
      console.log('Recebida mensagem! ' + mensagem.payloadString);
      this.checado = !this.checado;
    }

    let configuracao: ConfiguracaoMQTT = {
      hostname: 'm13.cloudmqtt.com',
      porta: 36956,
      idCliente: '123',
      conectou: conectou,
      mensagemRecebida: mensagemRecebida,
      configuracaoAutenticacao: {
        usuario: "ssjuptjm",
        senha: "ILeD0JPvmVFO"
      }
    };

    this.fwComunicacao.fwMQTT.configurarMQTT(configuracao);
  }


  publicarMqtt() {
    this.fwComunicacao.fwMQTT.publicar('oioi', '/teste');
  }

  inscreverMqtt() {
    this.fwComunicacao.fwMQTT.inscrever('/teste');
  }

  desinscreverMqtt() {
    this.fwComunicacao.fwMQTT.desinscrever('/teste');
  }



}


