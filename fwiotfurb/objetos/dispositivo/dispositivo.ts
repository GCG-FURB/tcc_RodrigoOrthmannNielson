import { ComandoDispositivo } from './comandoDispositivo';
export class Dispositivo {
    constructor(
        public Id: string,
        public Nome: string,
        public ComandoDispositivo: ComandoDispositivo,
        public Estado: string,
        public TipoDispositivo: string
    ) {}
}