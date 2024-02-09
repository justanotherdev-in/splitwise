// import ExpenseStrategy from "./split-strategy.js";
import { IUser } from "../../../types.js";
import Split from "../split.js";
import  { NonEqualSplitStrategy } from "./split-strategy.js";

class PercentSplitStrategy implements NonEqualSplitStrategy {
    users: Array<IUser>;
    totalAmount: number;
    userShare: Array<number>;

    constructor(users: Array<IUser>, totalAmount: number, userShare: Array<number>) {
        this.users = users;
        this.totalAmount = totalAmount;
        this.userShare = userShare;
        this.splitExpense();
    }

    splitExpense() {
        const splits: Split[] = [];
        this.users.forEach((user, i) => {
            splits.push(new Split(this.userShare[i], user));
        })
        return splits;
    }
}

export default PercentSplitStrategy;
