import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";

const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

function setup(overrides = {}) {
  const auth = {
    login: vi.fn().mockResolvedValue(),
    googleLogin: vi.fn().mockResolvedValue(),
    ...overrides,
  };
  useAuth.mockReturnValue(auth);
  render(<MemoryRouter><Login /></MemoryRouter>);
  return auth;
}

async function fillAndSubmit() {
  await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
  await userEvent.type(screen.getByLabelText(/password/i), "secret123");
  await userEvent.click(screen.getByRole("button", { name: /^login$/i }));
}

test("logs in and goes to the dashboard", async () => {
  const auth = setup();
  await fillAndSubmit();
  expect(auth.login).toHaveBeenCalledWith("a@b.com", "secret123");
  expect(mockNavigate).toHaveBeenCalledWith("/");
});

test("shows an error when login fails", async () => {
  setup({ login: vi.fn().mockRejectedValue(new Error("bad")) });
  await fillAndSubmit();
  expect(await screen.findByRole("alert")).toHaveTextContent(/invalid email or password/i);
});

test("Google button calls googleLogin", async () => {
  const auth = setup();
  await userEvent.click(screen.getByRole("button", { name: /continue with google/i }));
  expect(auth.googleLogin).toHaveBeenCalled();
});

test("shows an error when Google sign-in fails", async () => {
  setup({ googleLogin: vi.fn().mockRejectedValue(new Error("bad")) });
  await userEvent.click(screen.getByRole("button", { name: /continue with google/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/google sign-in failed/i);
});
