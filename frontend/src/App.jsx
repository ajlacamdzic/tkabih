import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout'; 
import ProtectedRoute from './components/ProtectedRoute';
import CalendarPage from "./pages/Calendar";
import UserDashboard from "./pages/UserDashboard"; 
import UserCalendar from "./pages/UserCalendar";
import UserMembers from "./pages/UserMembers";
import Logout from "./pages/Logout";
import Calendar from "./pages/Calendar";
import UserSignup from "./pages/UserSignup";
import ArhiviraniClanovi from './pages/ArhiviraniClanovi';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin sekcije sa Sidebarom */}
        <Route element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        {/* USER SEKCIJE SA SIDEBAROM */}
        <Route element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/members" element={<UserMembers />} /> 
          <Route path="/user/archived-members" element={<ArhiviraniClanovi />} />
          <Route path="/user/calendar" element={<Calendar canAddEvents={false} />} />
        </Route>

        <Route path="/logout" element={<Logout />} />
        <Route path="/user/signup" element={<UserSignup />} />
      </Routes>
    </Router>
  );
}