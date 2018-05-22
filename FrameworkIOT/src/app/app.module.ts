import { TelaControlePage } from './../pages/tela-controle/tela-controle';
import { ConfiguracoesPage } from './../pages/configuracoes/configuracoes';
import { AdicionarDispositivoMqttPage } from './../pages/adicionar-dispositivo-mqtt/adicionar-dispositivo-mqtt';
import { MeusDispositivosPage } from './../pages/meus-dispositivos/meus-dispositivos';
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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DispositivosFirebaseProvider } from '../providers/dispositivos-firebase/dispositivos-firebase';
import { ConfiguracaoMqttProvider } from '../providers/configuracao-mqtt/configuracao-mqtt';
import { AdicionarDispositivoBluetoothPage } from '../pages/adicionar-dispositivo-bluetooth/adicionar-dispositivo-bluetooth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CabecalhoCustomizadoComponent,
    CadastroUsuarioPage,
    MeusDispositivosPage,
    AdicionarDispositivoMqttPage,
    AdicionarDispositivoBluetoothPage,
    ConfiguracoesPage,
    TelaControlePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Firebase.Configuracao),
    AngularFireDatabaseModule,
    NgxErrorsModule,
    FormsModule,                          
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroUsuarioPage,
    MeusDispositivosPage,
    AdicionarDispositivoMqttPage,
    AdicionarDispositivoBluetoothPage,
    ConfiguracoesPage,
    TelaControlePage
  ],
  providers: [
    BluetoothSerial,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FwBluetoothProvider,
    FwMqttProvider,
    AngularFireAuth,
    AutenticacaoProvider,
    DispositivosFirebaseProvider,
    ConfiguracaoMqttProvider
  ]
})
export class AppModule { }
