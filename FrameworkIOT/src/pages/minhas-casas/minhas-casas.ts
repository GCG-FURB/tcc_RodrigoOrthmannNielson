import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { CasasFirebaseProvider } from './../../providers/casas-firebase/casas-firebase';
import { Casa } from 'fwiotfurb';
import { UsuariosFirebaseProvider } from './../../providers/usuarios-firebase/usuarios-firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Alert, AlertController } from 'ionic-angular';

/**
 * Generated class for the MinhasCasasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minhas-casas',
  templateUrl: 'minhas-casas.html',
})
export class MinhasCasasPage {

  public Casas: Array<Casa>;
  public CasaAtual: Casa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioDb: UsuariosFirebaseProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dbCasa: CasasFirebaseProvider,
    private auth: AutenticacaoProvider
  ) {
    this.atualizarDadosCasas();
  }

  private atualizarDadosCasas() {
    this.Casas = new Array<Casa>();
    this.usuarioDb.obterCasasUsuario().then(listaCasas => {
      listaCasas.forEach(casa => {
        this.Casas.push(casa);
      });
    })
    this.auth.adicionarInscricao(this.usuarioDb.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
    }));
  }

  atualizarCasaAtual(casa: Casa) {
    this.usuarioDb.atualizarCasaAtual(casa.Id);
    this.atualizarDadosCasas();
  }

  adicionarCasa() {
    let prompt = this.alertCtrl.create({
      title: 'Nova Casa',
      message: "Informe um nome e uma descrição",
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        },
        {
          name: 'descricao',
          placeholder: 'Descricao'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log(data);
            if (data.nome != undefined && data.descricao != undefined) {
              let idNovaCasa = this.dbCasa.adicionarCasa(new Casa("0", data.nome, data.descricao, null));
              this.usuarioDb.adicionarIdCasa(idNovaCasa);
              this.atualizarDadosCasas();
              this.alertCtrl.create({
                title: "Sucesso",
                message: "Nova casa adicionada",
                buttons: ["OK"]
              }).present();
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
