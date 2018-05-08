import { CadastroUsuarioPage } from './../pages/cadastro-usuario/cadastro-usuario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

// componentes
import { CabecalhoCustomizadoComponent } from './../components/cabecalho-customizado/cabecalho-customizado';

// paginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { MyApp } from './app.component';

// framework mqtt e bt
import { FwBluetoothProvider, FwMqttProvider } from 'fwiotfurb';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

// firebase
import { Firebase } from './../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CabecalhoCustomizadoComponent,
    CadastroUsuarioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Firebase.Configuracao),
    NgxErrorsModule,
    FormsModule,                          
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroUsuarioPage
  ],
  providers: [
    BluetoothSerial,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FwBluetoothProvider,
    FwMqttProvider,
    AngularFireAuth,
    AutenticacaoProvider
  ]
})
export class AppModule { }
