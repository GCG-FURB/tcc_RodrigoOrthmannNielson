import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dispositivo, ConfiguracaoMQTT } from 'fwiotfurb';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ConfiguracaoMqttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfiguracaoMqttProvider {


  private configuracao: AngularFireObject<ConfiguracaoMQTT>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider) {
    this.configuracao = this.db.object<ConfiguracaoMQTT>(auth.obterIdUsuario() + "/configuracaoMQTT");
  }

  /**
   * AdicionarDispositivo
  */
  public AtualizarConfiguracao(novaConfiguracao: ConfiguracaoMQTT) {
    this.configuracao.update(novaConfiguracao);
  }

  /**
   * ObterMeusDispositivos
   * 
   */
  public ObterConfiguracao(): Observable<ConfiguracaoMQTT> {
    return this.configuracao.valueChanges();
  }

}
