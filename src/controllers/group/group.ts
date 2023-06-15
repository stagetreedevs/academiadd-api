/* eslint-disable prettier/prettier */
export class Group {
    name: string;
    city: string;
    peticionante: string[];
    diligente: string[];
    created_at: Date;

    constructor(
        name: string,
        city: string,
        peticionante: string[],
        diligente: string[],
        created_at: Date,
    ) {
        this.name = name;
        this.city = city;
        this.peticionante = peticionante;
        this.diligente = diligente;
        this.created_at = created_at;
    }
}