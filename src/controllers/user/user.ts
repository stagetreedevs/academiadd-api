/* eslint-disable prettier/prettier */
export class User {
    email: string;
    password: string;
    name: string;
    phone: string;
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

    constructor(
        email: string,
        password: string,
        name: string,
        phone: string,
        person: string,
        CPF: string,
        CNPJ: string,
        uf: string,
        city: string,
        neighborhood: string,
        street: string,
        complement: string,
        cep: string,
        number: string
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
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
    }
}