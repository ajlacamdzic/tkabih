import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Briši podatke o korisniku (token, user info)
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // Preusmjeri na login stranicu (admin ili user)
    if (location.pathname.startsWith("/user")) {
      navigate("/user/login", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return <div>Odjavljujem...</div>;
}