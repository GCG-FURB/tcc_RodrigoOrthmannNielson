import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dispositivo, DispositivoMQTT } from 'fwiotfurb';
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
    this.listaDispositivos = this.db.list<Dispositivo>(auth.obterIdUsuario() + "/dispositivos");
  }

  /**
   * AdicionarDispositivo
  */
  public AdicionarDispositivo(dispositivo: Dispositivo) {
    let ref = this.listaDispositivos.push(dispositivo);
    ref.set({id: ref.key});
  }

  public AtualizarEstadoDispositivo(dispositivo: Dispositivo) {
    //this.listaDispositivos.update(dispositivo.$key, dispositivo);
  }

  /**
   * ObterMeusDispositivos
   * 
   */
  public ObterMeusDispositivos(): Observable<Dispositivo[]> {
    this.listaDispositivos.snapshotChanges().subscribe(sn => {
      console.log(sn[0].key);
      console.log(sn[0].payload);
      console.log(sn[0].type);
    })

    return this.listaDispositivos.valueChanges();
  }

}
