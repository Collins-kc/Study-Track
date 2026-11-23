import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    try {
      await googleLogin();
      navigate("/");
    } catch {
      setError("Google sign-in failed. Try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-2xl font-bold text-blue-600">StudyTrack</h1>
        <p className="text-gray-600">Log in to your account</p>
        {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}
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
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type="button" onClick={handleGoogle}
          className="w-full bg-orange-500 text-white rounded p-2 hover:bg-orange-600">
          Continue with Google
        </button>
        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-orange-500 font-medium">Register</Link>
        </p>
      </form>
    </main>
  );
}