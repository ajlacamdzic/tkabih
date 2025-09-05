import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";
import "../styles/Clubs.css";

export default function UserLayout() {
  return (
    <div className="dashboard-layout" style={{ display: "flex", minHeight: "100vh" }}>
      <UserSidebar />
      <main style={{ flex: 1, padding: "32px 24px" }}>
        <Outlet />
      </main>
    </div>
  );
}