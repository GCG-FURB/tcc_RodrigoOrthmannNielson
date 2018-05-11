import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dispositivo } from 'fwiotfurb';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DispositivosFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DispositivosFirebaseProvider {

  private listaDispositivos: AngularFireList<Dispositivo>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider) {
    this.listaDispositivos = this.db.list<Dispositivo>(auth.obterIdUsuario());
  }

  /**
   * AdicionarDispositivo
  */
  public AdicionarDispositivo(dispositivo: Dispositivo) {
    this.listaDispositivos.push(dispositivo);
  }

  /**
   * ObterMeusDispositivos
   * 
   */
  public ObterMeusDispositivos(): Observable<Dispositivo[]> {
    return this.listaDispositivos.valueChanges();
  }

}
