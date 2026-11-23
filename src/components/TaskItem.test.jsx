import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskItem from "./TaskItem";

const task = { id: "1", title: "Math", subject: "Maths", dueDate: "2026-12-01", done: false };

test("marks a task as done", async () => {
  const onUpdate = vi.fn();
  render(<TaskItem task={task} onUpdate={onUpdate} onDelete={vi.fn()} />);
  await userEvent.click(screen.getByRole("checkbox"));
  expect(onUpdate).toHaveBeenCalledWith("1", { done: true });
});

test("deletes a task", async () => {
  const onDelete = vi.fn();
  render(<TaskItem task={task} onUpdate={vi.fn()} onDelete={onDelete} />);
  await userEvent.click(screen.getByRole("button", { name: /delete/i }));
  expect(onDelete).toHaveBeenCalledWith("1");
});

test("edits the title", async () => {
  const onUpdate = vi.fn().mockResolvedValue();
  render(<TaskItem task={task} onUpdate={onUpdate} onDelete={vi.fn()} />);
  await userEvent.click(screen.getByRole("button", { name: /edit/i }));
  const input = screen.getByLabelText("Edit title");
  await userEvent.clear(input);
  await userEvent.type(input, "Physics");
  await userEvent.click(screen.getByRole("button", { name: /save/i }));
  expect(onUpdate).toHaveBeenCalledWith("1", { title: "Physics" });
});
