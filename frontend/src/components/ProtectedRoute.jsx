import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // Ako nije prijavljen, preusmjeri na univerzalni login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Ako rola ne odgovara traženoj, preusmjeri na početnu
  if (role && userData.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}