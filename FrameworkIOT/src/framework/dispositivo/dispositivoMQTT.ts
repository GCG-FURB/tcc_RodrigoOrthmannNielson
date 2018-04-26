import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';
import { ConfiguracaoMQTT } from '../configuracaoMQTT';

export class DispositivoMQTT extends Dispositivo {
    constructor(
        public Nome: string,
        public TopicoPublicacao: string,
        public TopicoInscricao: string,
        public Configuracao: ConfiguracaoMQTT,
        public ComandoDispositivo: ComandoDispositivo
    ) {
        super(Nome, ComandoDispositivo);
    }
}