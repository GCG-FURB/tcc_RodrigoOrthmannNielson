import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Ionic native
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

// Componentes
import { CabecalhoCustomizadoComponent } from './../components/cabecalho-customizado/cabecalho-customizado';
import { MyApp } from './app.component';

// Pages
import { FwBluetoothProvider } from '../providers/fw-bluetooth/fw-bluetooth';
import { HomePage } from '../pages/home/home';
import { FwMqttProvider } from '../providers/fw-mqtt/fw-mqtt';

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
    FwMqttProvider
  ]
})
export class AppModule {}
