import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";

test("shows an error when title and date are missing", async () => {
  render(<TaskForm onAdd={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: /save task/i }));
  expect(screen.getByRole("alert")).toHaveTextContent(/required/i);
});

test("calls onAdd with the trimmed values", async () => {
  const onAdd = vi.fn().mockResolvedValue();
  render(<TaskForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText(/task title/i), "  Math  ");
  await userEvent.type(screen.getByLabelText(/subject/i), "Maths");
  fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2026-12-01" } });
  await userEvent.click(screen.getByRole("button", { name: /save task/i }));
  expect(onAdd).toHaveBeenCalledWith({ title: "Math", subject: "Maths", dueDate: "2026-12-01" });
});

test("shows an error when saving fails", async () => {
  const onAdd = vi.fn().mockRejectedValue(new Error("fail"));
  render(<TaskForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText(/task title/i), "Math");
  fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2026-12-01" } });
  await userEvent.click(screen.getByRole("button", { name: /save task/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/could not save/i);
});
