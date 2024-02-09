// import { IUser } from "../../types";

import { ISplit, IUser } from "../../types";

class Split implements ISplit {
    amount: number;
    user: IUser;

    static id = 0;

    constructor(amount: number, user: IUser) {
        Split.id += 1;
        
        this.amount = amount;
        this.user = user;
    }
}

export default Split;