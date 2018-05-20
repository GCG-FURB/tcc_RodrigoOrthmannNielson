import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public dbDispositivo: DispositivosFirebaseProvider) {
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
        nome.value,
        new ComandoONOFF(comandoON.value, comandoOFF.value),
        topico.value,
        topico.value,
        null
      )
    );

    console.log(nome.value);
    console.log(topico.value);
    console.log(comandoON.value);
    console.log(comandoOFF.value);

  }

}
