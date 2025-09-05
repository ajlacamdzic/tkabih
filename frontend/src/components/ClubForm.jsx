import { useState } from "react";
import axios from "axios";
import "../styles/Clubs.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ClubForm({ onClose, onClubAdded }) {
  const [form, setForm] = useState({
    name: "",
    president: "",
    city: "",
    email: "",
    dateJoined: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await axios.post(`${API_BASE}/api/clubs`, form);
      onClubAdded(res.data.club); 
    } catch (err) {
      setError("Greška pri spremanju. Provjerite podatke ili server.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="form-field">
        <label>Naziv kluba</label>
        <input name="name" value={form.name} onChange={onChange} required />
      </div>

      <div className="form-field">
        <label>Predsjednik</label>
        <input name="president" value={form.president} onChange={onChange} required />
      </div>

      <div className="form-field">
        <label>Adresa</label>
        <input name="city" value={form.city} onChange={onChange} required />
      </div>

      <div className="form-field">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={onChange} required />
      </div>

      <div className="form-field">
        <label>Datum pristupa asocijaciji</label>
        <input type="date" name="dateJoined" value={form.dateJoined} onChange={onChange} required />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Spremanje…" : "Spremi klub"}
        </button>
        <button type="button" className="btn-secondary" onClick={onClose}>
          Otkaži
        </button>
      </div>
      </form>
  );
}