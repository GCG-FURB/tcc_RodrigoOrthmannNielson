import { Dispositivo } from './../dispositivo/dispositivo';

export class Comodo {
    constructor(
        public Id: string,
        public Nome: string,
        public Descricao: string,
        public Dispositivos: Array<Dispositivo>
    ) { }
}