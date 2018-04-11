import { Dispositivo } from './dispositivo';
import { ConfiguracaoMQTT } from '../configuracaoMQTT';

export class DispositivoMQTT extends Dispositivo {
    constructor(
        public Nome: string,
        //public TipoComunicacao: TipoComunicacao,
        public TopicoPublicacao: string,
        public TopicoInscricao: string,
        public Configuracao: ConfiguracaoMQTT
    ) {
        super(Nome/*, TipoComunicacao*/);
        
    }
}