import { Observable } from 'rxjs/Observable';
import { Casa, Dispositivo, Comodo } from 'fwiotfurb';
import { CasasFirebaseProvider } from './../casas-firebase/casas-firebase';
import { AutenticacaoProvider } from './../autenticacao/autenticacao';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Usuario } from './../../usuario';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuariosFirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosFirebaseProvider {

  private Usuario: AngularFireObject<Usuario>;
  private UsuarioObj: Usuario;
  private CasaUsuarioAtual: AngularFireObject<Casa>;

  constructor(private db: AngularFireDatabase, private auth: AutenticacaoProvider, private casaDb: CasasFirebaseProvider) {
    this.Usuario = this.db.object<Usuario>("usuarios/" + auth.obterIdUsuario());
    this.validarNovoUsuario();
  }

  /**
   * Adicona uma nova casa na lista do usuario
   */
  public adicionarIdCasa(id: string) {
    this.UsuarioObj.Casas.push(id);
    this.Usuario.update(this.UsuarioObj);
  }

  public adicionarDispositivo(casa: Casa, comodo: Comodo, dispositivo: Dispositivo) {

  }

  /**
   * Atualiza a casa atual do usuário
   * @param id Id da nova casa atual
   */
  public atualizarCasaAtual(id: string) {
    this.UsuarioObj.CasaAtual = id;
    this.Usuario.update(this.UsuarioObj);
  }

  /**
   * Valida se o usuário logado já está registrado na base. Caso não estiver, faz o cadastro.
   */
  private validarNovoUsuario() {
    this.auth.adicionarInscricao(this.Usuario.valueChanges().subscribe(usuario => {
      if (usuario == null) {
        this.adicionarNovoUsuario();
      } else {
        this.UsuarioObj = usuario;
      }
      this.CasaUsuarioAtual = this.db.object<Casa>("casas/" + this.UsuarioObj.CasaAtual);
    }));
  }

  /**
   * Cadastra o usuário logado
   */
  private adicionarNovoUsuario() {
    let casasUsuario = new Array<string>();
    let casaPadrao = this.casaDb.obterCasaPadrao();
    casasUsuario.push(casaPadrao);

    this.UsuarioObj = new Usuario(
      this.auth.obterIdUsuario(),
      this.auth.getEmail(),
      casasUsuario,
      casaPadrao,
      null
    )

    this.Usuario.update(this.UsuarioObj);
  }

  /**
   * Obtém a casa atual do usuário
   */
  public obterCasaAtual(): Observable<Casa> {
    // return new Promise(resolve => {
    //   this.auth.adicionarInscricao(this.Usuario.valueChanges().subscribe(usuario => {
    //     resolve(this.casaDb.obterCasas([usuario.CasaAtual]));
    //   }))
    // });
    return this.CasaUsuarioAtual.valueChanges();
  }

  /**
   * Obtém as chaves das casas do usuário
   */
  private obterChaves(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.auth.adicionarInscricao(this.Usuario.valueChanges().subscribe(usuario => {
        resolve(usuario.Casas);
      }));
    });
  }

  /**
   * Obtém as casas do usuário
   */
  public obterCasasUsuario(): Promise<Array<Casa>> {
    return new Promise(resolve => {
      this.obterChaves().then(chaves => {
        resolve(this.casaDb.obterCasas(chaves));
      })
    });
  }

}

