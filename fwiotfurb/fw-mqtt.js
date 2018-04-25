var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
var FwMqttProvider = /** @class */ (function () {
    function FwMqttProvider() {
    }
    //#region Métodos padrão de retorno MQTT
    FwMqttProvider.prototype.conexaoPerdida = function (message) {
        console.log('Conexão perdida. ', message);
    };
    FwMqttProvider.prototype.mensagemRecebida = function (message) {
        console.log(message.payloadString);
    };
    FwMqttProvider.prototype.conectouComSucesso = function () {
        console.log('Conectado ao MQTT');
    };
    FwMqttProvider.prototype.naoConectou = function (falha) {
        console.log('Falha ao conectar');
    };
    //#endregion
    /**
     * Configura e conecta à um broker MQTT
     * @param configuracao Objetos com configuração do MQTT
     */
    FwMqttProvider.prototype.configurarMQTT = function (configuracao) {
        this.Cliente = new Paho.MQTT.Client(configuracao.hostname, configuracao.porta, configuracao.idCliente);
        this.Cliente.onConnectionLost = this.conexaoPerdida;
        this.Cliente.onMessageArrived = configuracao.mensagemRecebida != null ? configuracao.mensagemRecebida : this.mensagemRecebida;
        this.conectarCliente({
            configuracaoAutenticacao: configuracao.configuracaoAutenticacao,
            conectou: configuracao.conectou,
            naoConectou: configuracao.naoConectou
        });
    };
    /**
     * Se desconecta de um cliente MQTT
     */
    FwMqttProvider.prototype.desconectar = function () {
        this.Cliente.disconnect();
    };
    /**
     * Valida se um cliente está conectado
     */
    FwMqttProvider.prototype.clienteConectado = function () {
        return this.Cliente == null ? false : this.Cliente.isConnected();
    };
    /**
     * Conecta ao cliente MQTT, possibilitando o uso de opções
     * @param opcoesConexao Opções da conexão MQTT (autenticação, funções de sucesso e falha)
     */
    FwMqttProvider.prototype.conectarCliente = function (opcoesConexao) {
        if (opcoesConexao.configuracaoAutenticacao != undefined) {
            var options = {
                useSSL: true,
                userName: opcoesConexao.configuracaoAutenticacao.usuario,
                password: opcoesConexao.configuracaoAutenticacao.senha,
                onSuccess: opcoesConexao.conectou != undefined ? opcoesConexao.conectou : this.conectouComSucesso,
                onFailure: opcoesConexao.naoConectou != undefined ? opcoesConexao.naoConectou : this.naoConectou
            };
            this.Cliente.connect(options);
        }
        else {
            var options = {
                onSuccess: opcoesConexao.conectou != undefined ? opcoesConexao.conectou : this.conectouComSucesso,
                onFailure: opcoesConexao.naoConectou != undefined ? opcoesConexao.naoConectou : this.naoConectou
            };
            this.Cliente.connect(options);
        }
    };
    /**
     * Publica uma mensagem à um tópico MQTT
     * @param mensagem Mensagem a ser publicada
     * @param topico Tópico em que será publicada a mensagem
     * @param qos QOS, valores devem ser entre 0 e 2
     */
    FwMqttProvider.prototype.publicar = function (mensagem, topico, qos) {
        if (this.Cliente != null && this.Cliente.isConnected()) {
            var msg = new Paho.MQTT.Message(mensagem);
            msg.destinationName = topico;
            if (qos != null)
                msg.qos = qos;
            this.Cliente.send(msg);
        }
    };
    /**
     * Se inscreve em um tópico
     * @param topico Tópico a se inscrever
     * @param opcoesInscricao Opções adicionais para inscrição
     */
    FwMqttProvider.prototype.inscrever = function (topico, opcoesInscricao) {
        this.Cliente.subscribe(topico, opcoesInscricao);
    };
    /**
     * Se desinscreve de um tópico
     * @param topico Tópico a se desinscrever
     * @param opcoesDesinscricao Opções adicionais para inscrição
     */
    FwMqttProvider.prototype.desinscrever = function (topico, opcoesDesisncricao) {
        this.Cliente.unsubscribe(topico, opcoesDesisncricao);
    };
    FwMqttProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FwMqttProvider);
    return FwMqttProvider;
}());
export { FwMqttProvider };
//# sourceMappingURL=fw-mqtt.js.map