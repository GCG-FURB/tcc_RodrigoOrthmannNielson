import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';

export class DispositivoBluetooth extends Dispositivo {
    constructor(
        public Id: string,
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string,
        public EnderecoMAC: string
    ) {
        super(Id, Nome, ComandoDispositivo, Estado, TipoDispositivo);
    }
}