import { Paho } from 'ng2-mqtt/mqttws31'
import { ConfiguracaoAutenticacaoMQTT } from './configuracaoAutenticacaoMQTT';

export interface ConfiguracaoMQTT {
        hostname: string;
        porta: number;
        idCliente: string;
        caminho?: string;
        configuracaoAutenticacao?: ConfiguracaoAutenticacaoMQTT;
        conectou?: () => void;
        naoConectou?: (any) => void;
        conexaoPerdida?: (objetoResposta: object) => void;
        mensagemRecebida?: (mensagem: Paho.MQTT.Message) => void;
}
