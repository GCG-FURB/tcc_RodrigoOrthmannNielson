import { ConfiguracaoAutenticacaoMQTT } from './configuracaoAutenticacaoMQTT';

export interface OpcoesConexaoMQTT {
    configuracaoAutenticacao?: ConfiguracaoAutenticacaoMQTT;
    conectou?: () => void;
    naoConectou?: (any) => void;
}
