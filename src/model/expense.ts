import { IExpense, ISplit, IUser, SplitType } from "../types.js";
import { SplitStrategy } from "./split/strategy/split-strategy.js";

class Expense implements IExpense {
    private id: number;
    amount: number;
    type: SplitType;
    createdBy: IUser;
    splits!: Array<ISplit>;

    static id: number = 0;

    constructor(amount: number, type: SplitType, createdBy: IUser, strategy: SplitStrategy) {
        Expense.id += 1;
        this.id = Expense.id;
        this.amount = amount;
        this.createdBy = createdBy;
        this.type = type;
        this.split(strategy);
    }

    split(strategy: SplitStrategy) {
        this.splits = strategy.splitExpense();
    }

    getId() {
        return this.id;
    }
}

export default Expense;