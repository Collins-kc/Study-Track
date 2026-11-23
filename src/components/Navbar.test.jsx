import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock("../context/AuthContext", () => ({ useAuth: vi.fn() }));
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

test("shows the user's email and logs out", async () => {
  const logout = vi.fn().mockResolvedValue();
  useAuth.mockReturnValue({ user: { email: "a@b.com" }, logout });
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  expect(screen.getByText("a@b.com")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /logout/i }));
  expect(logout).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});
