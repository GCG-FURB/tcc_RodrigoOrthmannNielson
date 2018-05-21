import { ComandoDispositivo } from './comandoDispositivo';

/**
 * Classe utilizada para dispositivos com comandos ON e OFF. Ex: lâmpadas sem controle de intensidade
 */
export class ComandoONOFF extends ComandoDispositivo{

    constructor(public TipoComando: string, public ON: string, public OFF: string) {
        super(TipoComando);
    }

}