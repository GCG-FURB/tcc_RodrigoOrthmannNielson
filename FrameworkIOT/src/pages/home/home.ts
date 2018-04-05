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
    this.fwMQTT.configurarMQTT('m13.cloudmqtt.com', 36956, '/TesteMQTT');
  }

  publicarMqtt() {
    this.fwMQTT.publicar();
  }

}


