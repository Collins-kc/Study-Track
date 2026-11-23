import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));

function setup() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/" element={<ProtectedRoute><p>Secret</p></ProtectedRoute>} />
      </Routes>
    </MemoryRouter>
  );
}

test("redirects to login when logged out", () => {
  useAuth.mockReturnValue({ user: null, loading: false });
  setup();
  expect(screen.getByText("Login page")).toBeInTheDocument();
});

test("shows content when logged in", () => {
  useAuth.mockReturnValue({ user: { email: "a@b.com" }, loading: false });
  setup();
  expect(screen.getByText("Secret")).toBeInTheDocument();
});

test("shows loading while checking auth", () => {
  useAuth.mockReturnValue({ user: null, loading: true });
  setup();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
