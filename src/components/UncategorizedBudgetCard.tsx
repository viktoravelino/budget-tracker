import React from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { Expense } from "../models/models";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard(props: any) {
  //@ts-ignore
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );
  if (amount === 0) return null;
  return <BudgetCard name="Uncategorized" gray amount={amount} {...props} />;
}
