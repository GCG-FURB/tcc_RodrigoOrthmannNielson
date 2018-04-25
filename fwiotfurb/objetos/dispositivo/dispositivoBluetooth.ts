import { Dispositivo } from './dispositivo';

export class DispositivoBluetooth extends Dispositivo {
    constructor(
        public Nome: string,
        //public TipoComunicacao: TipoComunicacao,
        public EnderecoMAC: string,
        public Id: string
    ) {
        super(Nome/*, TipoComunicacao*/);
    }
}