import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AutenticacaoProvider {
	private user: firebase.User;

	constructor(public autenticacaoFirebase: AngularFireAuth) {
		autenticacaoFirebase.authState.subscribe(user => {
			this.user = user;
		});
	}

	loginEmail(credentials) {
		return this.autenticacaoFirebase.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

  cadastrarUsuario(credentials) {
    return this.autenticacaoFirebase.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  deslogar(): Promise<void> {
    return this.autenticacaoFirebase.auth.signOut();
  }

  loginGoogle() {
		return this.oauthLogin(new firebase.auth.GoogleAuthProvider());
}

private oauthLogin(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.autenticacaoFirebase.auth.signInWithPopup(provider);
	} else {
		return this.autenticacaoFirebase.auth.signInWithRedirect(provider)
		.then(() => {
			return this.autenticacaoFirebase.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				alert(error.message);
			});
		});
	}
}
}