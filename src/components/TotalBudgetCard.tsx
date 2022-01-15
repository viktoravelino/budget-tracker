import React from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { Budget, Expense } from "../models/models";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard(props: any) {
  //@ts-ignore
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );

  const max = budgets.reduce(
    (total: number, budget: Budget) => total + budget.max,
    0
  );

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
