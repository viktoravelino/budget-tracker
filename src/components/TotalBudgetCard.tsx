import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard(props: any) {
  const { expenses, budgets } = useBudgets();
  if (!expenses) return null;
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);

  if (!budgets) return null;
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  return (
    <BudgetCard
      name="Total"
      gray
      amount={amount}
      max={max}
      {...props}
      hideButtons
    />
  );
}
