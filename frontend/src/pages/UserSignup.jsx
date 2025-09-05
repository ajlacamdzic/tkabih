import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo200.png';
import '../styles/Login.css';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UserSignup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${API_BASE}/api/auth/signup`, form);
      setSuccess("Uspješna registracija! Sada se možete prijaviti.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Greška pri registraciji.");
    }
  };

  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1>Tradicionalna karate-do Asocijacija Bosne i Hercegovine</h1>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2>Registracija kluba</h2>
          <form onSubmit={submit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className="login-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Lozinka"
              value={form.password}
              onChange={onChange}
              className="login-input"
              required
            />
            {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', fontSize: '12px', marginBottom: '10px' }}>{success}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="submit" className="login-button">Registruj se</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}