import '../styles/Login.css';
import logo from '../assets/logo200.png';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Neispravni podaci. Pokušajte ponovo.');
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
          <h2>Prijava</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</div>}
            <button type="submit" className="login-button">Prijavi se</button>
          </form>
        </div>
      </div>
    </div>
  );
}