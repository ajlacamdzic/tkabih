import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/clubs">Klubovi</Link>
          <Link to="/calendar">Kalendar</Link>

        </nav>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Odjava
      </button>
    </div>
  );
}
