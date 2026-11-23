import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fb from "firebase/auth";
import { AuthProvider, useAuth } from "./AuthContext";

vi.mock("../firebase/config", () => ({ auth: {}, googleProvider: {} }));
vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

function Consumer() {
  const { user, loading, login, register, googleLogin, logout } = useAuth();
  if (loading) return <p>loading</p>;
  return (
    <div>
      <p>{user ? user.email : "no user"}</p>
      <button onClick={() => login("a@b.com", "pw")}>do-login</button>
      <button onClick={() => register("a@b.com", "pw")}>do-register</button>
      <button onClick={() => googleLogin()}>do-google</button>
      <button onClick={() => logout()}>do-logout</button>
    </div>
  );
}

test("provides the current user", async () => {
  fb.onAuthStateChanged.mockImplementation((auth, cb) => { cb({ email: "a@b.com" }); return () => {}; });
  render(<AuthProvider><Consumer /></AuthProvider>);
  expect(await screen.findByText("a@b.com")).toBeInTheDocument();
});

test("calls Firebase for login, register, Google and logout", async () => {
  fb.onAuthStateChanged.mockImplementation((auth, cb) => { cb(null); return () => {}; });
  render(<AuthProvider><Consumer /></AuthProvider>);
  await userEvent.click(await screen.findByText("do-login"));
  await userEvent.click(screen.getByText("do-register"));
  await userEvent.click(screen.getByText("do-google"));
  await userEvent.click(screen.getByText("do-logout"));
  expect(fb.signInWithEmailAndPassword).toHaveBeenCalledWith({}, "a@b.com", "pw");
  expect(fb.createUserWithEmailAndPassword).toHaveBeenCalledWith({}, "a@b.com", "pw");
  expect(fb.signInWithPopup).toHaveBeenCalled();
  expect(fb.signOut).toHaveBeenCalled();
});
