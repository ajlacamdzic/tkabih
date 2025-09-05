import { useState, useEffect } from "react";
import MemberForm from "../components/MemberForm";
import "../styles/Clubs.css";
import { data } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UserMembers() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [error, setError] = useState("");

  // Dohvati clubId iz localStorage
  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const clubId = userData.club;
  const token = localStorage.getItem("token");

  if (!clubId) {
    setError("Nije pronađen klub za ovog korisnika.");
    return;
  }

  fetch(`${API_BASE}/api/members?club=${clubId}&sort=desc`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => setMembers(Array.isArray(data) ? data.filter(m => !m.archived) : [] ))
    .catch(() => setError("Greška prilikom učitavanja članova."));
}, [showForm]);

  // Dodavanje/uređivanje člana
  const handleSaved = () => {
    setShowForm(false);
    setEditMember(null);
  };

  const archiveMember = async (id) => {
  const token = localStorage.getItem("token");
  await fetch(`${API_BASE}/api/members/${id}/archive`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });
  setMembers(members => members.filter(m => m._id !== id));
};

  // Dohvati clubId za formu
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const clubId = userData.club;

  return (
    <div>
      <h2>Članovi kluba</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <button className="btn-primary" onClick={() => { setEditMember(null); setShowForm(true); }}>
        Dodaj člana
      </button>
      <table className="clubs-table" style={{ marginTop: "18px" }}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Ime oca</th>
            <th>Prezime</th>
            <th>Datum rođenja</th>
            <th>Mjesto</th>
            <th>Kategorija</th>
            <th>Kilaza</th>
            <th>Pojas</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(members) && members.map(m =>  (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.fatherName}</td>
              <td>{m.surname}</td>
              <td>{m.birthDate ? new Date(m.birthDate).toLocaleDateString() : ""}</td>
              <td>{m.city}</td>
              <td>{m.category}</td>
              <td>{m.weight}</td>
              <td>{m.belt}</td>
              <td>
                <button className="btn-secondary" onClick={() => { setEditMember(m); setShowForm(true); }}>Uredi</button>
                <button className="btn-secondary" onClick={() => archiveMember(m._id)}>Arhiviraj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <MemberForm
              member={editMember}
              clubId={clubId}
              onSaved={handleSaved}
              onClose={() => { setShowForm(false); setEditMember(null); }}
            />
          </div>
        </div>
      )}
    </div>);}