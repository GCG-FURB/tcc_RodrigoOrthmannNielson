import { OpcoesConexaoMQTT } from './objetos/opcoesConexaoMQTT';
import { ConfiguracaoAutenticacaoMQTT } from './objetos/configuracaoAutenticacaoMQTT';
import { ConfiguracaoMQTT } from './objetos/configuracaoMQTT';
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31'

@Injectable()
export class FwMqttProvider {

  private Cliente: Paho.MQTT.Client;

  constructor() { }

  //#region Métodos padrão de retorno MQTT
  private conexaoPerdida(message) {
    console.log('Conexão perdida. ', message);
  }

  private mensagemRecebida(message) {
    console.log(message.payloadString);
  }

  private conectouComSucesso() {
    console.log('Conectado ao MQTT');
  }

  private naoConectou(falha) {
    console.log('Falha ao conectar')
  }
  //#endregion

  /**
   * Configura e conecta à um broker MQTT
   * @param configuracao Objetos com configuração do MQTT
   */
  public configurarMQTT(configuracao: ConfiguracaoMQTT) {
    this.Cliente = new Paho.MQTT.Client(configuracao.hostname, configuracao.porta, configuracao.idCliente);
    this.Cliente.onConnectionLost = this.conexaoPerdida;
    this.Cliente.onMessageArrived = configuracao.mensagemRecebida != null ? configuracao.mensagemRecebida : this.mensagemRecebida;
    this.conectarCliente({
      configuracaoAutenticacao: configuracao.configuracaoAutenticacao,
      conectou: configuracao.conectou,
      naoConectou: configuracao.naoConectou
    });
  }

  /**
   * Se desconecta de um cliente MQTT
   */
  public desconectar() {
    this.Cliente.disconnect();
  }

  /**
   * Valida se um cliente está conectado
   */
  public clienteConectado(): boolean {
    return this.Cliente == null? false : this.Cliente.isConnected();
  }

  /**
   * Conecta ao cliente MQTT, possibilitando o uso de opções
   * @param opcoesConexao Opções da conexão MQTT (autenticação, funções de sucesso e falha)
   */
  private conectarCliente(opcoesConexao: OpcoesConexaoMQTT): void {
    if (opcoesConexao.configuracaoAutenticacao != undefined) {
      let options = {
        useSSL: true,
        userName: opcoesConexao.configuracaoAutenticacao.usuario,
        password: opcoesConexao.configuracaoAutenticacao.senha,
        onSuccess: opcoesConexao.conectou != undefined ? opcoesConexao.conectou : this.conectouComSucesso,
        onFailure: opcoesConexao.naoConectou != undefined ? opcoesConexao.naoConectou : this.naoConectou
      }
      this.Cliente.connect(options);
    } else {
      let options = {
        onSuccess: opcoesConexao.conectou != undefined ? opcoesConexao.conectou : this.conectouComSucesso,
        onFailure: opcoesConexao.naoConectou != undefined ? opcoesConexao.naoConectou : this.naoConectou
      }
      this.Cliente.connect(options);
    }
  }

  /**
   * Publica uma mensagem à um tópico MQTT
   * @param mensagem Mensagem a ser publicada
   * @param topico Tópico em que será publicada a mensagem
   * @param qos QOS, valores devem ser entre 0 e 2
   */
  public publicar(mensagem: string, topico: string, qos?: number): void {
    if (this.Cliente != null && this.Cliente.isConnected()) {
      let msg = new Paho.MQTT.Message(mensagem);
      msg.destinationName = topico;
      if (qos != null)
        msg.qos = qos;
      this.Cliente.send(msg);
    }
  }

  /**
   * Se inscreve em um tópico
   * @param topico Tópico a se inscrever
   * @param opcoesInscricao Opções adicionais para inscrição
   */
  public inscrever(topico: string, opcoesInscricao?: object) {
    this.Cliente.subscribe(topico, opcoesInscricao);
  }

  /**
   * Se desinscreve de um tópico
   * @param topico Tópico a se desinscrever
   * @param opcoesDesinscricao Opções adicionais para inscrição
   */
  public desinscrever(topico: string, opcoesDesisncricao?: object) {
    this.Cliente.unsubscribe(topico, opcoesDesisncricao)    
  }

}
