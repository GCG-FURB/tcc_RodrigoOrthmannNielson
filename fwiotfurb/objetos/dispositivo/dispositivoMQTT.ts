import { ComandoONOFF } from './comandoONOFF';
import { ComandoDispositivo } from './comandoDispositivo';
import { Dispositivo } from './dispositivo';
import { ConfiguracaoMQTT } from '../configuracaoMQTT';

export class DispositivoMQTT extends Dispositivo {
    constructor(
        public Id: string,
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string,
        public TopicoPublicacao: string,
        public TopicoInscricao: string,
        public Configuracao: ConfiguracaoMQTT
    ) {
        super(Id, Nome, ComandoDispositivo, Estado, TipoDispositivo);
    }
}