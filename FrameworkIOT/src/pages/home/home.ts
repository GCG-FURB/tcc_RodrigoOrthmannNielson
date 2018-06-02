import { ConfiguracaoMQTT, FwMqttProvider, FwBluetoothProvider, DispositivoBluetooth } from 'fwiotfurb';
import { Component } from '@angular/core';
import { NavController, Platform, Toggle } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor() {
  }
}


