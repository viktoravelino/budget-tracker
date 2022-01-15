export interface Budget {
  id?: string;
  name: string;
  max: number;
}

export interface Expense {
  id?: string;
  budgetId: string;
  amount: number;
  description: string;
}
