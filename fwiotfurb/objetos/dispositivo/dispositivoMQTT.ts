import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';
import { ConfiguracaoMQTT } from '../configuracaoMQTT';

export class DispositivoMQTT extends Dispositivo {
    constructor(
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public TopicoPublicacao: string,
        public TopicoInscricao: string,
        public Configuracao: ConfiguracaoMQTT
    ) {
        super(Nome, ComandoDispositivo);
        
    }
}