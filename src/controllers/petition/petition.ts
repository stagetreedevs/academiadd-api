/* eslint-disable prettier/prettier */
export class Petition {
    numeroProcesso: string;
    requerente: string;
    requerido: string;
    textoPeticao: string;
    grupo: string;
    anexos: string[];
    state: string;
    city: string;
    accepted: boolean;
    evaluation: string;
    created_at: Date;
    time_limit: Date;
    constructor(
        numeroProcesso: string,
        requerente: string,
        requerido: string,
        textoPeticao: string,
        grupo: string,
        anexos: string[],
        state: string,
        city: string,
        accepted: boolean,
        evaluation: string,
        created_at: Date,
        time_limit: Date,
    ) {
        this.numeroProcesso = numeroProcesso;
        this.requerente = requerente;
        this.requerido = requerido;
        this.textoPeticao = textoPeticao;
        this.grupo = grupo;
        this.anexos = anexos;
        this.state = state;
        this.city = city;
        this.accepted = accepted;
        this.evaluation = evaluation;
        this.created_at = created_at;
        this.time_limit = time_limit;
    }
}