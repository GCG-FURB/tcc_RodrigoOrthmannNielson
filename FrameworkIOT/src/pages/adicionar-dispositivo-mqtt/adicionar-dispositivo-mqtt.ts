import { AutenticacaoProvider } from './../../providers/autenticacao/autenticacao';
import { CasasFirebaseProvider } from './../../providers/casas-firebase/casas-firebase';
import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button, LoadingController } from 'ionic-angular';
import { Dispositivo, DispositivoMQTT, ComandoDispositivo, ComandoONOFF, Casa, Comodo } from 'fwiotfurb';
import { UsuariosFirebaseProvider } from '../../providers/usuarios-firebase/usuarios-firebase';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';

/**
 * Generated class for the AdicionarDispositivoMqttPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-dispositivo-mqtt',
  templateUrl: 'adicionar-dispositivo-mqtt.html',
})
export class AdicionarDispositivoMqttPage {

  public formulario: FormGroup;
  public CasaAtual: Casa;
  public ComodoSelecionado: Comodo;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbDispositivo: DispositivosFirebaseProvider,
    private alertCtrl: AlertController,
    private usuarioDb: UsuariosFirebaseProvider,
    private loadingCtrl: LoadingController,
    private casaDb: CasasFirebaseProvider,
    private auth: AutenticacaoProvider
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      topico: ['', Validators.required],
      comandoON: ['', Validators.required],
      comandoOFF: ['', Validators.required]
    });


    auth.adicionarInscricao(this.usuarioDb.obterCasaAtual().subscribe(casa => {
      this.CasaAtual = casa;
    }));
  }

  obterListaComodosPrompt(): Array<AlertInputOptions> {
    let listaInputs: Array<AlertInputOptions> = new Array<AlertInputOptions>();

    if (this.CasaAtual != null && this.CasaAtual.Comodos != null) {
      this.CasaAtual.Comodos.forEach(comodo => {
        let input: AlertInputOptions = {
          type: 'radio',
          label: comodo.Nome,
          value: comodo.Id
        }
        listaInputs.push(input)
      });
    }
    return listaInputs;
  }

  adicionarDispositivo() {
    let { nome, topico, comandoON, comandoOFF } = this.formulario.controls;

    this.alertCtrl.create({
      title: "Novo Dispositivo MQTT",
      message: "Selecione um cômodo para este dispositivo",
      inputs: this.obterListaComodosPrompt(),
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: data => {
            let comodo = this.CasaAtual.Comodos.find(c => c.Id == data);
            if (comodo.Dispositivos == null) {
              comodo.Dispositivos = new Array<Dispositivo>();
            }
            comodo.Dispositivos.push(
              new DispositivoMQTT(
                comodo.Dispositivos.length.toString(),
                nome.value,
                new ComandoONOFF(ComandoONOFF.name, comandoON.value, comandoOFF.value),
                comandoOFF.value,
                DispositivoMQTT.name,
                topico.value,
                topico.value,
                null
              ));
              this.casaDb.atualizarDadosCasa(this.CasaAtual);
              this.alertCtrl.create({
                message: "Dispositivo MQTT adicionado",
                buttons: [{
                  text: "OK",
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }]
              }).present();
          }
        }
      ]
    }).present();


  }

}
