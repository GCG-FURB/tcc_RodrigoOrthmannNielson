import { ComandoDispositivo } from './comandoDispositivo';
export class Dispositivo {
    constructor(
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string
    ) {}
}