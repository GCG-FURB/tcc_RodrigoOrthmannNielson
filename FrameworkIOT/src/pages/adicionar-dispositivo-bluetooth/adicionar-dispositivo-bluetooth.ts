import { DispositivosFirebaseProvider } from './../../providers/dispositivos-firebase/dispositivos-firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FwBluetoothProvider, DispositivoBluetooth, ComandoONOFF } from 'fwiotfurb';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AdicionarDispositivoBluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-dispositivo-bluetooth',
  templateUrl: 'adicionar-dispositivo-bluetooth.html',
})
export class AdicionarDispositivoBluetoothPage {

  public listaDispositivosPareados: Array<DispositivoBluetooth>;
  public listaDispositivosNaoPareados: Array<DispositivoBluetooth>;
  public formulario: FormGroup;
  public macNovoDispositivo: string;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fwBluetooth: FwBluetoothProvider,
    private platform: Platform,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public dbDispositivo: DispositivosFirebaseProvider
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      comandoON: ['', Validators.required],
      comandoOFF: ['', Validators.required]
    });

    let loading = this.loadingCtrl.create({
      content: 'Ativando o bluetooth'
    });

    this.platform.ready().then(() => {
      loading.present();
      return fwBluetooth.ativarBluetooth();
    }).then((sucesso) => {
      if (sucesso) {
        return this.fwBluetooth.listarDispositivosPareados();
      }
    }).then(dispositivos => {
      loading.setContent("Carregando dispositivos pareados");
      this.listaDispositivosPareados = dispositivos;
      return this.fwBluetooth.listarDispositivosNaoPareados();
    }).then(naoPareados => {
      loading.setContent("Carregando dispositivos não pareados");
      this.listaDispositivosNaoPareados = naoPareados;
      loading.dismiss();
    }).catch(err => {
      loading.dismiss();
      alertCtrl.create({
        title: 'Erro',
        message: 'Falha ao buscar dispositivos bluetooth',
        buttons: [
          {
            text: 'Cancelar',
          }
        ]
      }).present();
    });
  }

  adicionarDispositivo() {
    if (this.macNovoDispositivo != undefined && this.macNovoDispositivo != null && this.macNovoDispositivo != "") {
      let { nome, comandoON, comandoOFF } = this.formulario.controls;
      this.dbDispositivo.AdicionarDispositivo(
        new DispositivoBluetooth(
          "0",
          nome.value,
          new ComandoONOFF(ComandoONOFF.name, comandoON.value, comandoOFF.value),
          comandoOFF.value,
          DispositivoBluetooth.name,
          this.macNovoDispositivo
        )
      );
    }
  }

  obterListaPrompt(): Array<AlertInputOptions> {
    let listaInputs: Array<AlertInputOptions> = new Array<AlertInputOptions>();

    if (this.listaDispositivosPareados != undefined) {
      this.listaDispositivosPareados.forEach(dispositivo => {
        let input: AlertInputOptions = {
          type: 'radio',
          label: dispositivo.Nome,
          value: dispositivo.EnderecoMAC
        }
        listaInputs.push(input)
      });
    }
    if (this.listaDispositivosNaoPareados != undefined) {
      this.listaDispositivosNaoPareados.forEach(dispositivo => {
        let input: AlertInputOptions = {
          type: 'radio',
          label: dispositivo.Nome,
          value: dispositivo.EnderecoMAC
        }
        listaInputs.push(input)
      });
    }
    return listaInputs;
  }

  buscarDispositivo() {
    let promptDispositivo = this.alertCtrl.create({
      title: 'Tipos de dispositivo',
      message: 'Selecione o tipo de dispositivo que deseja adicionar',
      inputs: this.obterListaPrompt(),
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.macNovoDispositivo = data;
          }
        }
      ]
    });

    promptDispositivo.present();
  }
}
