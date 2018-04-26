import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';

export class DispositivoBluetooth extends Dispositivo {
    constructor(
        public Nome: string,
        public EnderecoMAC: string,
        public Id: string,
        public ComandoDispositivo: ComandoDispositivo
    ) {
        super(Nome, ComandoDispositivo);
    }
}