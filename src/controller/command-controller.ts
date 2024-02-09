// import EqualSplitStrategy from "../model/split/strategy/equal-split-strategy.js";
// import SplitStrategy from "../model/split/strategy/split-strategy.js";
import EqualSplitStrategy from "../model/split/strategy/equal-split-strategy.js";
import PercentSplitStrategy from "../model/split/strategy/percent-split-strategy.js";
import { IUser } from "../types.js";
import UserExpenseController from "./user-expense-controller.js";

class CommandController {
    userExpenseController: UserExpenseController;
    // commandMap: { [x:string]: any }
    // strategies: { [x: string]: SplitStrategy }

    constructor(expenseController: UserExpenseController) {
        this.userExpenseController = expenseController;
    }

    parseAndExecuteCommand(command: string) {
        const [type, ...rest] = command.split(' ');
        // console.log('COMMAND>>', command);
        if (type === 'SHOW') {
            const [userId] = rest;

            if (userId) {
                return this.userExpenseController.showUserBalance(userId);
            } else {
                return this.userExpenseController.showAllBalance();
            }

        } else if(type === 'EXPENSE') {
            const [userId, amount, usersToAdd, ...restData] = rest;
            const usersArray = [];
            for (var i = 0; i < Number(usersToAdd); i++) {
                usersArray.push(this.userExpenseController.userMap.get(restData[i]) as IUser);
            }
            const [splitType, ...share] = restData.slice(i);
            if (splitType === 'EQUAL') {
                this.userExpenseController.addExpense(splitType, Number(amount), userId, new EqualSplitStrategy(usersArray, Number(amount)));
            } else if (splitType === 'PERCENT') {
                this.userExpenseController.addExpense(splitType, Number(amount), userId, new PercentSplitStrategy(usersArray, Number(amount), share.map(sh => Number(sh) * Number(amount) / 100)));
            }
        }
    }
}

export default CommandController;