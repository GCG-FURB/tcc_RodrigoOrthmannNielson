import { DispositivoBluetooth } from './../../framework/DispositivoBluetooth';
import { FwBluetoothProvider } from './../../providers/fw-bluetooth/fw-bluetooth';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  //listaDispositivosNaoPareados: Array<DispositivoBluetooth>;

  constructor(private platform: Platform, public navCtrl: NavController, private fwBluetooth: FwBluetoothProvider) {
    this.platform.ready().then(() => fwBluetooth.ativarBluetooth());
  }

  listarDispositivosPareados(): void {
    this.fwBluetooth.listarDispositivosPareados()
      .then((dispositivos) => this.listaDispositivosPareados = dispositivos);
  }

  listarDispositivosNaoPareados(): void {
    //listaDis
  }

  pressionado(dispositivo: DispositivoBluetooth) {
    alert(dispositivo.Nome);
  }
}


