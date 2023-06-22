/* eslint-disable prettier/prettier */
export class Invitation {
    group_name: string;
    group_id: string;
    user_name: string;
    user_id: string;
    response: boolean;
    message: string;
    created_at: Date;

    constructor(
        group_name: string,
        group_id: string,
        user_name: string,
        user_id: string,
        response: boolean,
        message: string,
        created_at: Date,
    ) {
        this.group_name = group_name;
        this.group_id = group_id;
        this.user_name = user_name;
        this.user_id = user_id;
        this.response = response;
        this.message = message;
        this.created_at = created_at;
    }
}