import { AutenticacaoProvider } from './../providers/autenticacao/autenticacao';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  paginas: Array<{ titulo: string, component: any }>;
  rootPage: any = LoginPage;

  constructor(private platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, public auth: AutenticacaoProvider) {

    this.paginas = [
      { titulo: 'Home Page', component: HomePage }
    ];

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });

    this.auth.autenticacaoFirebase.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
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
    this.nav.setRoot(HomePage);
  }
  // initializeApp() {
  //   this.rootPage = LoginPage;
  // }
}

