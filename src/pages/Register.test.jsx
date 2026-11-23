import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { useAuth } from "../context/AuthContext";

vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));

function setup(register = vi.fn().mockResolvedValue()) {
  useAuth.mockReturnValue({ register });
  render(<MemoryRouter><Register /></MemoryRouter>);
  return register;
}

async function fill(password, confirm) {
  await userEvent.type(screen.getByLabelText("Email"), "a@b.com");
  await userEvent.type(screen.getByLabelText("Password"), password);
  await userEvent.type(screen.getByLabelText("Confirm password"), confirm);
  await userEvent.click(screen.getByRole("button", { name: /register/i }));
}

test("rejects short passwords", async () => {
  setup();
  await fill("123", "123");
  expect(screen.getByRole("alert")).toHaveTextContent(/at least 6/i);
});

test("rejects mismatched passwords", async () => {
  setup();
  await fill("secret1", "secret2");
  expect(screen.getByRole("alert")).toHaveTextContent(/do not match/i);
});

test("registers and shows a success message", async () => {
  const register = setup();
  await fill("secret123", "secret123");
  expect(register).toHaveBeenCalledWith("a@b.com", "secret123");
  expect(await screen.findByRole("status")).toHaveTextContent(/account created/i);
});

test("shows an error when the email is already used", async () => {
  setup(vi.fn().mockRejectedValue({ code: "auth/email-already-in-use" }));
  await fill("secret123", "secret123");
  expect(await screen.findByRole("alert")).toHaveTextContent(/already registered/i);
});
