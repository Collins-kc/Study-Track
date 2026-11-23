import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg">StudyTrack</span>
      <div className="flex items-center gap-3 text-sm">
        <span className="hidden sm:inline">{user?.email}</span>
        <button onClick={handleLogout}
          className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
          Logout
        </button>
      </div>
    </nav>
  );
}