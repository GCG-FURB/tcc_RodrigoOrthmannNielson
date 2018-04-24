import { FwComunicacaoProvider } from './../../providers/fw-comunicacao/fw-comunicacao';
import { ConfiguracaoMQTT } from './../../framework/configuracaoMQTT';
import { FwMqttProvider } from './../../providers/fw-mqtt/fw-mqtt';
import { DispositivoBluetooth } from './../../framework/dispositivo/dispositivoBluetooth';
import { FwBluetoothProvider } from './../../providers/fw-bluetooth/fw-bluetooth';
import { Component } from '@angular/core';
import { NavController, Platform, Toggle } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  public listaDispositivosNaoPareados: Array<DispositivoBluetooth>;
  public conectado: DispositivoBluetooth;
  public foi: boolean = false;

  constructor(private fwComunicacao: FwComunicacaoProvider, private fwBluetooth: FwBluetoothProvider, private platform: Platform) {
    this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  }

  listarDispositivosPareados(): void {
    this.fwComunicacao.fwBluetooth.listarDispositivosPareados()
      .then((dispositivos) => {
        this.listaDispositivosPareados = dispositivos;
      });
  }

  listarDispositivosNaoPareados(): void {
    this.fwComunicacao.fwBluetooth.listarDispositivosNaoPareados()
      .then((dispositivos) => this.listaDispositivosNaoPareados = dispositivos);
  }

  conectadoDisp() {
    let res = this.fwBluetooth.dispositivoConectado()
    .then(msg => alert(msg))
    .catch(err => alert(err));
    
    // if (this.fwBluetooth.dispositivoConectado()) {
    //   alert('Conectado');
    // } else {
    //   alert('Desconectado');
    // }

  }

  changeTeste(ctl: Toggle) {
    if (ctl.checked) {
      this.enviarMsg('1');
    } else {
      this.enviarMsg('0');
    }
  }

  pressionado(dispositivo: DispositivoBluetooth) {
    //alert('AAAAAAAAAAAA');
    console.log(dispositivo.EnderecoMAC);
    this.fwBluetooth.conectaEnviaMensagemDispositivo("0", dispositivo.EnderecoMAC);
    //if (this.conectado == null || this.conectado.Id != dispositivo.Id) {
    // this.fwBluetooth.conectarDispositivo(dispositivo.EnderecoMAC);
    // this.conectado = dispositivo;
    // this.fwBluetooth.dispositivoConectado();
    // this.listaDispositivosNaoPareados = null;
    //}
    //alert(dispositivo.Nome);
  }

  enviarMsg(msg: string) {
    this.fwBluetooth.conectaEnviaMensagemDispositivo(msg, '98:D3:31:F7:35:77');
  }

  conectar(dispositivo: DispositivoBluetooth) {
    alert('ASDASDSA');
    this.fwBluetooth.conectaEnviaMensagemDispositivo("0", dispositivo.EnderecoMAC);
    //this.fwComunicacao.fwBluetooth.conectarDispositivo(dispositivo.EnderecoMAC);
  }

  public checado: boolean = true;

  teste3() {
    //this.
  }

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


