import { UsuariosFirebaseProvider } from './../usuarios-firebase/usuarios-firebase';
import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comodo } from 'fwiotfurb';

/*
  Generated class for the ComodosFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComodosFirebaseProvider {

  private Casas: AngularFireList<Comodo>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider, private usr: UsuariosFirebaseProvider) {
    //this.Casas = this.db.list<Comodo>("casas/" + usr.. "comodos");
  }

}
