import logo from '../assets/logo200.png';
import '../styles/Login.css';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" />
      <h1>Tradicionalna karate-do Asocijacija Bosne i Hercegovine</h1>
    </header>
  );
}