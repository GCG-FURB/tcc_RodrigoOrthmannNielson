import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { Dispositivo, DispositivoMQTT, ComandoDispositivo, ComandoONOFF } from 'fwiotfurb';

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

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dbDispositivo: DispositivosFirebaseProvider,
    private alertCtrl: AlertController
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      topico: ['', Validators.required],
      comandoON: ['', Validators.required],
      comandoOFF: ['', Validators.required]
    });
  }


  adicionarDispositivo() {
    let { nome, topico, comandoON, comandoOFF } = this.formulario.controls;
    this.dbDispositivo.AdicionarDispositivo(
      new DispositivoMQTT(
        "0",
        nome.value,
        new ComandoONOFF(ComandoONOFF.name, comandoON.value, comandoOFF.value),
        comandoOFF.value,
        DispositivoMQTT.name,
        topico.value,
        topico.value,
        null
      )
    );

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
