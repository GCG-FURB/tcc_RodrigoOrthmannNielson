import { FwMqttProvider } from './../fw-mqtt/fw-mqtt';
import { FwBluetoothProvider } from './../fw-bluetooth/fw-bluetooth';
import { Platform, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FwComunicacaoProvider {

  constructor(private platform: Platform, public fwBluetooth: FwBluetoothProvider, public fwMQTT: FwMqttProvider) {
    
  }

}
