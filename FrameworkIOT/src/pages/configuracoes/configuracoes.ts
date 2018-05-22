import { ConfiguracaoMQTT } from 'fwiotfurb';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfiguracaoMqttProvider } from '../../providers/configuracao-mqtt/configuracao-mqtt';

/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  public formulario: FormGroup;
  public configuracaoAtual: ConfiguracaoMQTT;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public configMQTT: ConfiguracaoMqttProvider,
    private alertCtrl: AlertController
  ) {

    this.formulario = this.formBuilder.group({
      hostname: ['', Validators.required],
      porta: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });

    configMQTT.ObterConfiguracao().subscribe(configuracao => {
      this.configuracaoAtual = configuracao;
    })
  }

  atualizarConfiguracaoMQTT() {
    let { hostname, porta, usuario, senha } = this.formulario.controls;

    let novaConfiguracao: ConfiguracaoMQTT = {
      hostname: hostname.value,
      porta: +porta.value,
      idCliente: '0',
      configuracaoAutenticacao: {
        usuario: usuario.value,
        senha: senha.value
      }
    };

    this.configMQTT.AtualizarConfiguracao(novaConfiguracao);

    let alert = this.alertCtrl.create({
      subTitle: 'A configuração MQTT foi atualizada com sucesso',
      buttons: ['OK']
    });
    alert.present();
  }
}
