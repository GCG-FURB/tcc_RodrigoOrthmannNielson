import { ConfiguracaoMQTT } from 'fwiotfurb';
export class Usuario {
    constructor(
        public Id: string,
        public Email: string,
        public Casas: Array<string>,
        public CasaAtual: string,
        public ConfiguracaoMQTT: ConfiguracaoMQTT
    ) {}
}