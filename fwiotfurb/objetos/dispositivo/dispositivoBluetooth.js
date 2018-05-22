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
var DispositivoBluetooth = /** @class */ (function (_super) {
    __extends(DispositivoBluetooth, _super);
    function DispositivoBluetooth(Id, Nome, ComandoDispositivo, Estado, TipoDispositivo, EnderecoMAC) {
        var _this = _super.call(this, Id, Nome, ComandoDispositivo, Estado, TipoDispositivo) || this;
        _this.Id = Id;
        _this.Nome = Nome;
        _this.ComandoDispositivo = ComandoDispositivo;
        _this.Estado = Estado;
        _this.TipoDispositivo = TipoDispositivo;
        _this.EnderecoMAC = EnderecoMAC;
        return _this;
    }
    return DispositivoBluetooth;
}(Dispositivo));
export { DispositivoBluetooth };
//# sourceMappingURL=dispositivoBluetooth.js.map