import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import CalendarPage from "./pages/Calendar";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Ovdje je layout za admin sekcije sa Sidebarom */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/calendar" element={<CalendarPage />} />

        </Route>
      </Routes>
    </Router>
  );
}
