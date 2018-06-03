import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { CasasFirebaseProvider } from './../../providers/casas-firebase/casas-firebase';
import { Casa, Comodo } from 'fwiotfurb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuariosFirebaseProvider } from '../../providers/usuarios-firebase/usuarios-firebase';

/**
 * Generated class for the MeusComodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-comodos',
  templateUrl: 'meus-comodos.html',
})
export class MeusComodosPage {

  public CasaAtual: Casa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public usuarioDb: UsuariosFirebaseProvider,
    public casaDb: CasasFirebaseProvider,
    private auth: AutenticacaoProvider,
  ) {
    this.auth.adicionarInscricao(this.usuarioDb.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
    }));
  }

  adicionarComodo() {
    let prompt = this.alertCtrl.create({
      title: 'Novo Cômodo',
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
              this.casaDb.adicionarComodoCasa(this.CasaAtual, new Comodo("0", data.nome, data.descricao, null));
              this.alertCtrl.create({
                title: "Sucesso",
                message: "Novo cômodo adicionado",
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
