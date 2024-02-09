import { ISplit, IUser } from "../../../types";

interface SplitStrategy {
	users: Array<IUser>;
	totalAmount: number;
	splitExpense: () => Array<ISplit>;
}

interface NonEqualSplitStrategy extends SplitStrategy {
	userShare: Array<number>;
}

// export { ExpenseStrategy };

// abstract class ExpenseStrategy {
// 	splitExpense(userIds: Array<number>) {
// 		// const split = new 
// 	}
// }

export { SplitStrategy, NonEqualSplitStrategy};