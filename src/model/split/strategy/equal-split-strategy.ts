import { IUser } from "../../../types.js";
import Split from "../split.js";
import { SplitStrategy } from "./split-strategy.js";
// import ExpenseStrategy from "./split-strategy.js";

class EqualSplitStrategy implements SplitStrategy {
    users: Array<IUser>;
    totalAmount: number;

    constructor(users: Array<IUser>, totalAmount: number) {
        this.users = users;
        this.totalAmount = totalAmount;
    }

    splitExpense() {
        const splits: Split[] = []
        this.users.forEach(user => {
            splits.push(new Split(this.totalAmount / this.users.length, user));
        });
        return splits;
    }
}

export default EqualSplitStrategy;
