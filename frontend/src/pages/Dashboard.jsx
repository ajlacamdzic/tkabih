import { useState, useEffect } from "react";
import '../styles/AdminLayout.css';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const [clubs, setClubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [showClubs, setShowClubs] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Dohvati sve klubove
    fetch(`${API_BASE}/api/clubs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log("CLUBS:", data);
        setClubs(Array.isArray(data) ? data : []);
      });

    // Dohvati sve članove
    fetch(`${API_BASE}/api/members`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Clanovi;", data);
        setMembers(Array.isArray(data) ? data : []);
      });
  }, []);

  // Ukupan broj članova iz svih klubova
  const totalMembers = members.length;

  return (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginTop: "80px" }}>
      {/* Widget za klubove */}
      <div
        className="dashboard-widget"
        style={{
          flex: "1 1 300px",
          background: "#f5f5f5",
          padding: "32px",
          borderRadius: "12px",
          cursor: "pointer"
        }}
        onClick={() => setShowClubs(true)}
      >
        <h3>Ukupan broj klubova</h3>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{clubs.length}</div>
      </div>

      {/* Widget za članove */}
      <div
        className="dashboard-widget"
        style={{
          flex: "1 1 300px",
          background: "#f5f5f5",
          padding: "32px",
          borderRadius: "12px",
          cursor: "pointer"
        }}
        onClick={() => setShowMembers(true)}
      >
        <h3>Ukupan broj članova</h3>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{totalMembers}</div>
      </div>

      {/* Modal/tabela za klubove */}
      {showClubs && (
        <div className="modal-overlay" onClick={() => setShowClubs(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2>Svi klubovi</h2>
            <table className="clubs-table">
              <thead>
                <tr>
                  <th>Naziv kluba</th>
                  <th>Grad</th>
                  <th>Kontakt</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map(club => (
                  <tr key={club._id}>
                    <td>{club.name}</td>
                    <td>{club.city}</td>
                    <td>{club.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn-secondary" onClick={() => setShowClubs(false)} style={{ marginTop: "24px" }}>Zatvori</button>
          </div>
        </div>
      )}

      {/* Modal/tabela za članove svih klubova */}
      {showMembers && (
        <div className="modal-overlay" onClick={() => setShowMembers(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2>Svi članovi svih klubova</h2>
            <table className="clubs-table">
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Klub</th>
                </tr>
              </thead>
              <tbody>
  {[...members]
    .sort((a, b) => {
      const clubA = clubs.find(
        c =>
          c._id === (typeof a.club === "object" ? a.club.$oid : a.club)
      );
      const clubB = clubs.find(
        c =>
          c._id === (typeof b.club === "object" ? b.club.$oid : b.club)
      );
      if (!clubA || !clubB) return 0;
      return clubA.name.localeCompare(clubB.name);
    })
    .map((m, idx) => {
      const club = clubs.find(
        c =>
          c._id === (typeof m.club === "object" ? m.club.$oid : m.club)
      );
      return (
        <tr key={m._id || idx}>
          <td>{m.name}</td>
          <td>{m.surname}</td>
          <td>{club ? club.name : "Nepoznat klub"}</td>
        </tr>
      );
    })}
</tbody>
            </table>
            <button className="btn-secondary" onClick={() => setShowMembers(false)} style={{ marginTop: "24px" }}>Zatvori</button>
          </div>
        </div>
      )}

    </div>
  );
}