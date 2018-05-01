import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { CabecalhoCustomizadoComponent } from './../components/cabecalho-customizado/cabecalho-customizado';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FwBluetoothProvider, FwMqttProvider } from 'fwiotfurb';

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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FwBluetoothProvider,
    FwMqttProvider,
  ]
})
export class AppModule { }
