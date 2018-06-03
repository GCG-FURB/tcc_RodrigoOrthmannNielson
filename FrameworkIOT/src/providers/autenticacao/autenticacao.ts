import { DispositivosFirebaseProvider } from './../dispositivos-firebase/dispositivos-firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { ConfiguracaoMqttProvider } from '../configuracao-mqtt/configuracao-mqtt';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AutenticacaoProvider {
	private user: firebase.User;
	private listaInscricoes: Array<Subscription>;

	constructor(public autenticacaoFirebase: AngularFireAuth) {
		this.listaInscricoes = new Array<Subscription>();
		autenticacaoFirebase.authState.subscribe(user => {
			this.user = user;
		});
	}

	adicionarInscricao(inscricao: Subscription) {
		this.listaInscricoes.push(inscricao);
	}

	loginEmail(credentials) {
		return this.autenticacaoFirebase.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	cadastrarUsuario(credentials) {
		return this.autenticacaoFirebase.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	obterIdUsuario(): string {
		return this.user.uid;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	deslogar(): Promise<void> {
		this.listaInscricoes.forEach(inscricao => {
			inscricao.unsubscribe();
		})
		return this.autenticacaoFirebase.auth.signOut();
	}

	private oauthLogin(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.autenticacaoFirebase.auth.signInWithPopup(provider);
		} else {
			return this.autenticacaoFirebase.auth.signInWithRedirect(provider)
				.then(() => {
					return this.autenticacaoFirebase.auth.getRedirectResult().then(result => {
						// This gives you a Google Access Token.
						// You can use it to access the Google API.
						let token = result.credential.accessToken;
						// The signed-in user info.
						let user = result.user;
						console.log(token, user);
					}).catch(function (error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}
}