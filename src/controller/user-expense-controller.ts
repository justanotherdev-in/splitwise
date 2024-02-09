import { IExpense, IExpenseController, IUser, SplitType } from "../types.js";
import User from "../model/user.js";
import Expense from "../model/expense.js";
import { SplitStrategy } from "../model/split/strategy/split-strategy.js";

class UserExpenseController implements IExpenseController {
    userMap: Map<string, User>;
    expenses: Set<IExpense>;
    balanceSheet: Map<User, Map<User, number>>

    constructor() {
        this.userMap = new Map();
        this.expenses = new Set();
        this.balanceSheet = new Map();
    }

    addUser(id: string, name: string, email?: string, mobile?: number) {
        const user = new User(id, name, email, mobile);
        this.userMap.set(id, user);
        this.balanceSheet.set(user, new Map());
    }

    addExpense(type: SplitType, amount: number, createdBy: string, splitStrategy: SplitStrategy) {
        const createdByUser = this.userMap.get(createdBy) as IUser;
        const expense = new Expense(amount, type, createdByUser, splitStrategy);
        this.expenses.add(expense);
        const expenseCreatorBalanceSheet = this.balanceSheet.get(createdByUser);

        expense.splits.forEach(split => {
            const expenseCreatorBalance = expenseCreatorBalanceSheet?.get(split.user) || 0;
            expenseCreatorBalanceSheet?.set(split.user, expenseCreatorBalance + split.amount);

            const borrowerBalanceSheet = this.balanceSheet.get(split.user);
            const borrowerBalance = borrowerBalanceSheet?.get(createdByUser) || 0;
            borrowerBalanceSheet?.set(createdByUser, borrowerBalance - split.amount);
        });
        // console.log(this.balanceSheet);
    }

    getUserIds() {
        const iterator = this.userMap.keys();

        const userIds = []
        while (true) {
            const userId = iterator.next().value;
            if (userId) {
                userIds.push(userId);
            } else {
                break;
            }
        }
        return userIds;
    }

    showAllBalance() {
        const resp: Array<string> = [];
        this.balanceSheet.forEach((userBalanceSheet, user1) => {
            userBalanceSheet.forEach((bal, user2) => {
                if (bal < 0) {
                    resp.push(`${user1.id} owes ${user2.id}: ${Math.abs(bal)}`);
                }
            })
        })
        return resp.length ? resp : 'No balances';
    }

    showUserBalance(userId: string) {
        const resp: Array<string> = [];
        const user = this.userMap.get(userId);
        const userBalance = this.balanceSheet.get(user as IUser);
        // const balance: Array<{ user: IUser, bal: number }> = [];
        userBalance?.forEach((bal, user) => {
            // balance.push({ user, bal });
            if (bal) {
                resp.push(bal > 0 ? `${user.id} owes ${userId}: ${Math.abs(bal)}` :  `${userId} owes ${user.id}: ${Math.abs(bal)}`)
            }
        })
        return resp.length ? resp.sort() : 'No balances';
    }
}

export default UserExpenseController;