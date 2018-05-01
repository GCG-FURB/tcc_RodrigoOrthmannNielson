import { Dispositivo } from './../dispositivo/dispositivo';

export class Comodo {
    constructor(public Nome: string, public Descricao: string, public Dispositivos: Array<Dispositivo>) {}
}