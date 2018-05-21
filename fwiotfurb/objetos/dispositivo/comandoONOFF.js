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
import { ComandoDispositivo } from './comandoDispositivo';
/**
 * Classe utilizada para dispositivos com comandos ON e OFF. Ex: lâmpadas sem controle de intensidade
 */
var ComandoONOFF = /** @class */ (function (_super) {
    __extends(ComandoONOFF, _super);
    function ComandoONOFF(TipoComando, ON, OFF) {
        var _this = _super.call(this, TipoComando) || this;
        _this.TipoComando = TipoComando;
        _this.ON = ON;
        _this.OFF = OFF;
        return _this;
    }
    return ComandoONOFF;
}(ComandoDispositivo));
export { ComandoONOFF };
//# sourceMappingURL=comandoONOFF.js.map