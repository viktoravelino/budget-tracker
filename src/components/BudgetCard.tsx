import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  gray?: boolean;
  hideButtons?: boolean;
  onAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
}

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  onViewExpensesClick,
  hideButtons,
}: BudgetCardProps) {
  // Create a className array for the card's classes
  const classNames = [];
  // If the total amount if greater than the maximum amount, applies a light red bg
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    // If there is a gray prop set, apply a gray bg. (red bg overlay gray bg)
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount: number, max: number) {
  const ratio = amount / max;
  // If the ration is less than 50% the progress bar color is blue
  if (ratio < 0.5) return "primary";
  // If the ration is less than 75% the progress bar color is yellow
  if (ratio < 0.75) return "warning";
  // If the ration is greater or equals than 75% the progress bar color is red
  return "danger";
}
