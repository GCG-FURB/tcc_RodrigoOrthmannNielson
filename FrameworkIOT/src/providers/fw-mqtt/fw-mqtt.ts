import { ConfiguracaoMQTT } from './../../framework/configuracaoMQTT';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Paho } from 'ng2-mqtt/mqttws31'

@Injectable()
export class FwMqttProvider {

  private Configuracao: ConfiguracaoMQTT;
  private Cliente: Paho.MQTT.Client;

  constructor() {
  }


  //#region Métodos de retorno MQTT

  conexaoPerdida(message) {
    console.log('Conexão perdida. ', message);
  }

  mensagemRecebida(message) {
    console.log(message.payloadString);
  }

  onConnect() {
    console.log('Conectado ao MQTT func');
  }

  doFail(e) {
    console.log('Falha ao conectar func')
  }

  conectouComSucesso() {
    console.log('Conectado ao MQTT');
  }

  falhaAoConectar() {
    console.log('Falha ao conectar')
  }


  //#endregion

  configurarMQTT(hostname: string, porta: number, caminho: string) {
    this.Cliente = new Paho.MQTT.Client('m13.cloudmqtt.com', 36956, '123');

    this.Cliente.onConnectionLost = this.conexaoPerdida;
    this.Cliente.onMessageArrived = this.mensagemRecebida;
    var options = {
      useSSL: true,
      userName: "ssjuptjm",
      password: "ILeD0JPvmVFO",
      onSuccess: this.conectouComSucesso,
      onFailure: this.falhaAoConectar
    }
    this.Cliente.connect(options);
  }

  publicar() {
    var message = new Paho.MQTT.Message("Olá");
    message.destinationName = "/teste";
    this.Cliente.send(message);
  }

  inscrever() {
    this.Cliente.subscribe('/teste', '');
  }

}
