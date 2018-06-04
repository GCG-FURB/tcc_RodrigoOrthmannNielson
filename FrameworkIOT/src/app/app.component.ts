import { HomePage } from './../pages/home/home';
import { MeusComodosPage } from './../pages/meus-comodos/meus-comodos';
import { MinhasCasasPage } from './../pages/minhas-casas/minhas-casas';
import { TelaControlePage } from './../pages/tela-controle/tela-controle';
import { ConfiguracoesPage } from './../pages/configuracoes/configuracoes';
import { MeusDispositivosPage } from './../pages/meus-dispositivos/meus-dispositivos';
import { AutenticacaoProvider } from './../providers/autenticacao/autenticacao';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  paginas: Array<{ titulo: string, component: any }>;
  rootPage: any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public auth: AutenticacaoProvider) {

    this.paginas = [
      { titulo: 'Controle', component: TelaControlePage},
      { titulo: 'Casas', component: MinhasCasasPage},
      { titulo: 'Cômodos', component: MeusComodosPage},
      { titulo: 'Dispositivos', component: MeusDispositivosPage},
      { titulo: 'Configurações', component: ConfiguracoesPage}
    ];

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.autenticacaoFirebase.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = TelaControlePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }

  abrirPagina(page: { title: string, component: any }): void {
    this.nav.setRoot(page.component);
  }

  login() {
    this.menuCtrl.close();
    this.auth.deslogar();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.menuCtrl.close();
    this.auth.deslogar();
    this.nav.setRoot(LoginPage);
    window.location.reload();
  }
  // initializeApp() {
  //   this.rootPage = LoginPage;
  // }
}

