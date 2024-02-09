import { IUser } from "../types.js";

class User implements IUser {
    id: string;
    name: string;
    email?: string;
    mobile?: number;

    static id = 0;

    constructor(id: string, name: string, email?: string, mobile?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
}

export default User;