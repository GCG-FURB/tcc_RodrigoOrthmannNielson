import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { CabecalhoCustomizadoComponent } from './../components/cabecalho-customizado/cabecalho-customizado';
import { MyApp } from './app.component';
import { FwBluetoothProvider } from '../providers/fw-bluetooth/fw-bluetooth';
import { HomePage } from '../pages/home/home';
import { FwMqttProvider } from '../providers/fw-mqtt/fw-mqtt';
import { FwComunicacaoProvider } from '../providers/fw-comunicacao/fw-comunicacao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CabecalhoCustomizadoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    BluetoothSerial,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FwBluetoothProvider,
    FwMqttProvider,
    FwComunicacaoProvider
  ]
})
export class AppModule {}
