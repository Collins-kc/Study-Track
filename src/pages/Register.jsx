import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await register(email, password);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.code === "auth/email-already-in-use"
        ? "That email is already registered."
        : "Could not create account. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">Create account</h1>
        {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
        {success && <p role="status" className="text-green-600 text-sm">{success}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input id="email" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input id="password" type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium">Confirm password</label>
          <input id="confirm" type="password" required value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 w-full border rounded p-2" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-sm text-center">
          Have an account? <Link to="/login" className="text-orange-500 font-medium">Login</Link>
        </p>
      </form>
    </main>
  );
}