import { Link } from "react-router-dom";


export default function UserSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2>Korisnički Panel</h2>
        <nav>
          <Link to="/user/dashboard">Dashboard</Link>
          <Link to="/user/calendar">Kalendar</Link>
          <Link to="/user/members">Članovi</Link>
          <Link to="/user/archived-members">Arhivirani članovi</Link>
        </nav>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          window.location.href = "/";
        }}
      >
        Odjava
      </button>
    </div>
  );
}