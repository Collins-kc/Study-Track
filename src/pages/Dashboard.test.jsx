import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import useTasks from "../hooks/useTasks";

vi.mock("../hooks/useTasks", () => ({ default: vi.fn() }));
vi.mock("../components/Navbar", () => ({ default: () => <nav>nav</nav> }));

const base = { tasks: [], loading: false, error: "", addTask: vi.fn(), updateTask: vi.fn(), deleteTask: vi.fn() };

test("shows the loading state", () => {
  useTasks.mockReturnValue({ ...base, loading: true });
  render(<Dashboard />);
  expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
});

test("shows the empty state", () => {
  useTasks.mockReturnValue(base);
  render(<Dashboard />);
  expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
});

test("shows an error message", () => {
  useTasks.mockReturnValue({ ...base, error: "Could not load tasks." });
  render(<Dashboard />);
  expect(screen.getByRole("alert")).toHaveTextContent(/could not load tasks/i);
});

test("lists tasks", () => {
  useTasks.mockReturnValue({
    ...base,
    tasks: [{ id: "1", title: "Math", subject: "Maths", dueDate: "2026-12-01", done: false }],
  });
  render(<Dashboard />);
  expect(screen.getByText("Math")).toBeInTheDocument();
});
