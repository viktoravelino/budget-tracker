import { FormEvent, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

interface AddBudgetModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function AddBudgetModal({
  show,
  handleClose,
}: AddBudgetModalProps) {
  const nameRef = useRef<HTMLInputElement>();
  const maxRef = useRef<HTMLInputElement>();

  const { addBudget } = useBudgets();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Max Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
