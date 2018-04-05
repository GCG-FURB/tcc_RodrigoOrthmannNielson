import { ConfiguracaoMQTT } from './../../framework/configuracaoMQTT';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Paho } from 'ng2-mqtt/mqttws31'

@Injectable()
export class FwMqttProvider {

  private Configuracao: ConfiguracaoMQTT;

  constructor() {
  }

  conexaoPerdida(message) {
    console.log(message);
  }

  mensagemRecebida(message) {
    console.log(message);
  }

  configurarMQTT(hostname: string, porta: number, caminho: string) {
    let cliente = new Paho.MQTT.Client('m13.cloudmqtt.com', 36956, '123');

    cliente.onConnectionLost = this.conexaoPerdida;
    cliente.onMessageArrived = this.mensagemRecebida;

    var options = {
      useSSL: true,
      userName: "ssjuptjm",
      password: "ILeD0JPvmVFO",
      onSuccess: onConnect,
      onFailure: doFail
    }

    cliente.connect(options);

    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      //cliente.subscribe("/cloudmqtt");
      var message = new Paho.MQTT.Message("Hello CloudMQTT");
      message.destinationName = "/cloudmqtt";
      cliente.send(message);
    }

    function doFail(e) {
      console.log(e);
    }
  }
  
  publicar() {
    console.log('123');
  }

  inscrever() {
    console.log('123');
  }


}
