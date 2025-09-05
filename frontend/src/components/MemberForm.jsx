import { useState } from "react";
import axios from "axios";
import "../styles/Clubs.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MemberForm({ member, clubId, onSaved, onClose }) {
  const [form, setForm] = useState(member || {
    name: "",
    fatherName: "",
    surname: "",
    birthDate: "",
    city: "",
    category: "",
    weight: "",
    belt: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      if (member) {
        await axios.put(`${API_BASE}/api/members/${member._id}`, form, config);
      } else {
        await axios.post(`${API_BASE}/api/members`, form , config);
      }
      onSaved();
    } catch (err) {
      setError("Greška pri spremanju.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="form-field"><label>Ime</label><input name="name" value={form.name} onChange={onChange} required /></div>
      <div className="form-field"><label>Ime oca</label><input name="fatherName" value={form.fatherName} onChange={onChange} /></div>
      <div className="form-field"><label>Prezime</label><input name="surname" value={form.surname} onChange={onChange} required /></div>
      <div className="form-field"><label>Datum rođenja</label><input type="date" name="birthDate" value={form.birthDate ? form.birthDate.slice(0, 10) : ""} onChange={onChange} required /></div>
      <div className="form-field"><label>Mjesto stanovanja</label><input name="city" value={form.city} onChange={onChange} /></div>
      <div className="form-field"><label>Kategorija</label><input name="category" value={form.category} onChange={onChange} /></div>
      <div className="form-field"><label>Kilaza</label><input type="number" name="weight" value={form.weight} onChange={onChange} /></div>
      <div className="form-field"><label>Pojas</label><input name="belt" value={form.belt} onChange={onChange} /></div>
      {error && <div className="form-error">{error}</div>}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Spremanje…" : "Spremi člana"}</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Zatvori</button>
      </div>
    </form>
  );
}