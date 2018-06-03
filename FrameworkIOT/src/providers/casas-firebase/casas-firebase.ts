import { Casa, Comodo } from 'fwiotfurb';
import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CasasFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasasFirebaseProvider {

  private Casas: AngularFireList<Casa>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider) {
    this.Casas = this.db.list<Casa>("casas");
  }

  /**
   * Adiciona uma nova casa
   * @param casa Objeto casa
   */
  public adicionarCasa(casa: Casa): string {
    casa.Id = this.Casas.push(casa).key;
    this.Casas.update(casa.Id, casa);
    return casa.Id;
  }

  public adicionarComodoCasa(casa: Casa, comodo: Comodo) {
    if (casa.Comodos == null) {
      casa.Comodos = new Array<Comodo>();
    } else {
      comodo.Id = casa.Comodos.length.toString();
    }
    casa.Comodos.push(comodo);
    this.Casas.update(casa.Id, casa);
  }

  public atualizarDadosCasa(casa: Casa) {
    this.Casas.update(casa.Id, casa);
  }

  /**
   * Obtém as casas a partir de uma lista de ids
   */
  public obterCasas(listaIds: Array<string>): Promise<Array<Casa>> {
    var promises = listaIds.map(key => {
      return this.Casas.query.ref.child(key).once("value");
    });

    return new Promise(resolve => {
      Promise.all(promises).then((snapshots) => {
        let listaCasas = new Array<Casa>();
        snapshots.forEach(snap => {
          listaCasas.push(snap.val());
        })
        resolve(listaCasas);
      })
    })
  }

  /**
   * Adiciona uma casa padrão e retorna o Id dela.
   */
  public obterCasaPadrao(): string {
    let novaCasa = new Casa("0", "Minha casa", "Minha casa", null);
    return this.adicionarCasa(novaCasa);
  }

}
