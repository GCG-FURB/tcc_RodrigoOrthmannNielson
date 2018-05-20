import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';

export class DispositivoBluetooth extends Dispositivo {
    constructor(
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public EnderecoMAC: string,
        public Id: string
    ) {
        super(Nome, ComandoDispositivo);
    }
}