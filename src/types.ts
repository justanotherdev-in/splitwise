interface IUser {
    id: string;
    name: string;
    email?: string;
    mobile?: number;
}

interface IExpense {
    type: SplitType;
    amount: number;
    createdBy: IUser
    splits: Array<ISplit>
}

type SplitType = 'EQUAL' | 'PERCENT' | 'EXACT';

interface IExpenseController {
}

interface ISplit {
    user: IUser;
    amount: number;
}

export { IUser, IExpense, SplitType, IExpenseController, ISplit }