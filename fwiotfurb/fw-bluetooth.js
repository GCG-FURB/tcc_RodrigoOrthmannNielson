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
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { DispositivoBluetooth } from './objetos/dispositivo/dispositivoBluetooth';
var FwBluetoothProvider = /** @class */ (function () {
    function FwBluetoothProvider(bluetoothSerial) {
        this.bluetoothSerial = bluetoothSerial;
    }
    /**
     * Ativa o bluetooth do celular
     */
    FwBluetoothProvider.prototype.ativarBluetooth = function () {
        this.bluetoothSerial.enable()
            .then(function () { return console.log('Bluetooth ativado'); })
            .catch(function (err) { return alert(err); });
    };
    /**
     * Valida se existe algum dispositivo conectado
     * @returns {Promise<boolean>} Promise com verdadeiro caso o dispositivo esteja conectado, falso caso contrário
     */
    FwBluetoothProvider.prototype.dispositivoConectado = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.bluetoothSerial.isConnected()
                .then(function (msg) { return resolve(msg == "OK"); })
                .catch(function (err) { return reject(false); });
        });
    };
    /**
     * Conecta em um dispositivo
     * @param enderecoMac Endereço MAC do dispositivo
     */
    FwBluetoothProvider.prototype.conectarDispositivo = function (enderecoMac) {
        this.bluetoothSerial.connect(enderecoMac).subscribe();
    };
    /**
     * Envia uma mensagem ao dispositivo conectado atualmente
     * @param mensagem Mensagem a ser enviada
     */
    FwBluetoothProvider.prototype.enviarMensagem = function (mensagem, funcaoSucesso, funcaoErro) {
        this.bluetoothSerial.write(mensagem.toString())
            .then(function (success) { return funcaoSucesso == undefined ? console.log('Enviou a mensagem com sucesso' + success) : funcaoSucesso; })
            .catch(function (err) { return funcaoErro == undefined ? console.log('Erro ao enviar mensagem' + err) : funcaoErro; });
    };
    /**
     * Conecta e envia uma mensagem à um determinado dispositivo.
     * @param mensagem Mensagem a ser enviada
     * @param enderecoMac Endereço MAC do dispositivo
     */
    FwBluetoothProvider.prototype.conectaEnviaMensagemDispositivo = function (mensagem, enderecoMac) {
        var _this = this;
        this.bluetoothSerial.isConnected()
            .then(function (msg) { return msg == "OK"; })
            .then(function (conectado) {
            if (conectado) {
                return _this.bluetoothSerial.disconnect();
            }
            return new Promise(function (resolve) { return resolve(); });
        })
            .then(function (msg) {
            _this.conectarEEnviarMensagemTimeout(mensagem, enderecoMac);
        })
            .catch(function (err) {
            _this.conectarEEnviarMensagemTimeout(mensagem, enderecoMac);
        });
    };
    /**
     * Conecta e envia uma mensagem, aplicando um timeout antes de enviar a mensagem
     * @param mensagem Mensagem a ser enviada
     * @param enderecoMac Endereço MAC do dispositivo
     */
    FwBluetoothProvider.prototype.conectarEEnviarMensagemTimeout = function (mensagem, enderecoMac) {
        var _this = this;
        this.bluetoothSerial.connect(enderecoMac).subscribe();
        setTimeout(function () {
            _this.enviarMensagem(mensagem);
        }, 1000);
    };
    /**
     * Lista os dispositivos bluetooth e os atribui à uma variável
     * @returns {Promise<Array<DispositivoBluetooth>>} Promise com os dispositivos encontrados, caso sucesso
     */
    FwBluetoothProvider.prototype.listarDispositivosPareados = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.bluetoothSerial.list().then(function (dispositivos) {
                var dispositivosPareados = new Array();
                dispositivos.forEach(function (d) {
                    dispositivosPareados.push(new DispositivoBluetooth(d.name, null, null, null, d.address, d.id));
                });
                resolve(dispositivosPareados);
            });
            (function (err) {
                reject();
            });
        });
    };
    /**
     * Lista os dispositivos bluetooth e os atribui à uma variável
     * @returns {Promise<Array<DispositivoBluetooth>>} Promise com os dispositivos não pareados encontrados, caso sucesso
     */
    FwBluetoothProvider.prototype.listarDispositivosNaoPareados = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.bluetoothSerial.discoverUnpaired()
                .then(function (dispositivos) {
                var dispositivosNaoPareados = new Array();
                dispositivos.forEach(function (d) {
                    dispositivosNaoPareados.push(new DispositivoBluetooth(d.name, null, null, null, d.address, d.id));
                });
                resolve(dispositivosNaoPareados);
            });
            (function (err) {
                reject();
            });
        });
    };
    FwBluetoothProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof BluetoothSerial !== "undefined" && BluetoothSerial) === "function" && _a || Object])
    ], FwBluetoothProvider);
    return FwBluetoothProvider;
    var _a;
}());
export { FwBluetoothProvider };
//# sourceMappingURL=fw-bluetooth.js.map