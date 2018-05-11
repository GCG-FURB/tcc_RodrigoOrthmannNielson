import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarDispositivoMqttPage } from './adicionar-dispositivo-mqtt';

@NgModule({
  declarations: [
    AdicionarDispositivoMqttPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarDispositivoMqttPage),
  ],
})
export class AdicionarDispositivoMqttPageModule {}
