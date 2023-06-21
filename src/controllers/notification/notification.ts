/* eslint-disable prettier/prettier */
export class Notification {
    issuer_id: string;
    issuer_name: string;
    receiver_id: string;
    receiver_name: string;
    type: string;
    message: string;
    read: boolean;
    date: Date;

    constructor(
        issuer_id: string,
        issuer_name: string,
        receiver_id: string,
        receiver_name: string,
        type: string,
        message: string,
        read: boolean,
        date: Date
    ) {
        this.issuer_id = issuer_id;
        this.issuer_name = issuer_name;
        this.receiver_id = receiver_id;
        this.receiver_name = receiver_name;
        this.type = type;
        this.message = message;
        this.read = read;
        this.date = date;
    }
}