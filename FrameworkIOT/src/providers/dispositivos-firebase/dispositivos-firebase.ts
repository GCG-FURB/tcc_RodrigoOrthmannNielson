import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dispositivo, DispositivoMQTT, Casa } from 'fwiotfurb';
import { Observable } from 'rxjs/Observable';
import { UsuariosFirebaseProvider } from '../usuarios-firebase/usuarios-firebase';

/*
  Generated class for the DispositivosFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DispositivosFirebaseProvider {

  private listaDispositivos: AngularFireList<Dispositivo>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider) {
    //this.listaDispositivos = this.db.list<Dispositivo>(auth.obterIdUsuario() + "/dispositivos");
  }

  /**
   * AdicionarDispositivo
  */
  public AdicionarDispositivo(dispositivo: Dispositivo) {
    let ref = this.listaDispositivos.push(dispositivo);
    dispositivo.Id = ref.key;
    this.listaDispositivos.update(dispositivo.Id, dispositivo);
  }

  public AtualizarEstadoDispositivo(dispositivo: Dispositivo) {
    this.listaDispositivos.update(dispositivo.Id, dispositivo);
  }

  /**
   * ObterMeusDispositivos
   */
  //public ObterMeusDispositivos(casaAtual: Casa): Observable<Dispositivo[]> {
    //return this.listaDispositivos.valueChanges();
  //}

}
