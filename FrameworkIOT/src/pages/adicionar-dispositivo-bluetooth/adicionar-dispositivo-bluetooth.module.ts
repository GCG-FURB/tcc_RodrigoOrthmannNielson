import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarDispositivoBluetoothPage } from './adicionar-dispositivo-bluetooth';

@NgModule({
  declarations: [
    AdicionarDispositivoBluetoothPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarDispositivoBluetoothPage),
  ],
})
export class AdicionarDispositivoBluetoothPageModule {}
