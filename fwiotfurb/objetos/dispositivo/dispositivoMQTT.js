var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Dispositivo } from './dispositivo';
var DispositivoMQTT = /** @class */ (function (_super) {
    __extends(DispositivoMQTT, _super);
    function DispositivoMQTT(Nome, ComandoDispositivo, Estado, TopicoPublicacao, TopicoInscricao, Configuracao) {
        var _this = _super.call(this, Nome, ComandoDispositivo, Estado) || this;
        _this.Nome = Nome;
        _this.ComandoDispositivo = ComandoDispositivo;
        _this.Estado = Estado;
        _this.TopicoPublicacao = TopicoPublicacao;
        _this.TopicoInscricao = TopicoInscricao;
        _this.Configuracao = Configuracao;
        return _this;
    }
    return DispositivoMQTT;
}(Dispositivo));
export { DispositivoMQTT };
//# sourceMappingURL=dispositivoMQTT.js.map