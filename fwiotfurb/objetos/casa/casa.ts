import { Comodo } from "./comodo";

export class Casa {
    constructor(
        public Id: string,
        public Nome: string,
        public Descricao: string,
        public Comodos: Array<Comodo>
    ) { }
}