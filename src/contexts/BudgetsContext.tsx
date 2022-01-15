//@ts-nocheck
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Budget, Expense } from "../models/models";

interface BudgetsContextInterface {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addExpense: (expense: Expense) => void;
  addBudget: (budget: Budget) => void;
  deleteBudget: (budget: Budget) => void;
  deleteExpense: (expense: Expense) => void;
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

const BudgetsContext = React.createContext<BudgetsContextInterface>(null);

export function useBudgets() {
  return useContext(BudgetsContext);
}

export function BudgetsProvider({ children }: any) {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }: Expense) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuid(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }: Budget) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }

      return [...prevBudgets, { id: uuid(), name, max }];
    });
  }

  function deleteBudget({ id }: Budget) {
    //TODO: Deal with expenses uncategorized
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }: Expense) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets: budgets as Budget[],
        expenses: expenses as Expense[],
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}
