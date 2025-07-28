import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
