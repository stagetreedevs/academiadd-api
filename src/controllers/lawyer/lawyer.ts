/* eslint-disable prettier/prettier */
export class Lawyer {
    email: string;
    password: string;
    type: string;
    name: string;
    phone: string;
    OAB: string;
    person: string;
    CPF: string;
    CNPJ: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    complement: string;
    cep: string;
    number: string;
    creditCards: [string];

    constructor(
        email: string,
        password: string,
        type: string,
        name: string,
        phone: string,
        OAB: string,
        person: string,
        CPF: string,
        CNPJ: string,
        uf: string,
        city: string,
        neighborhood: string,
        street: string,
        complement: string,
        cep: string,
        number: string,
        creditCards: [string]
    ) {
        this.email = email;
        this.password = password;
        this.type = type;
        this.name = name;
        this.phone = phone;
        this.OAB = OAB;
        this.person = person;
        this.CPF = CPF;
        this.CNPJ = CNPJ;
        this.uf = uf;
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
        this.complement = complement;
        this.cep = cep;
        this.number = number;
        this.creditCards = creditCards;
    }
}