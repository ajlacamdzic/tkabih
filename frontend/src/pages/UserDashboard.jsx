import { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UserDashboard() {
  const [activeCount, setActiveCount] = useState(0);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  const [showEvents, setShowEvents] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const clubId = userData.club;

    // Dohvati aktivne članove (ostaje filter po klubu)
    fetch(`${API_BASE}/api/members?club=${clubId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const activeMembers = Array.isArray(data) ? data.filter(m => !m.archived) : [];
        setActiveCount(activeMembers.length);
        setMembers(activeMembers);
      });

    // Dohvati sve događaje (bez filtera)
    fetch(`${API_BASE}/api/events`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setEventCount(Array.isArray(data) ? data.length : 0);
        setEvents(Array.isArray(data) ? data : []);
      });
  }, []);

  return (
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginTop: "80px" }}>
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
        <h3>Aktivni članovi</h3>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{activeCount}</div>
      </div>

      {/* Widget za događaje */}
      <div
        className="dashboard-widget"
        style={{
          flex: "1 1 300px",
          background: "#f5f5f5",
          padding: "32px",
          borderRadius: "12px",
          cursor: "pointer"
        }}
        onClick={() => setShowEvents(true)}
      >
        <h3>Svi događaji</h3>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{eventCount}</div>
      </div>

      {/* Modal/tabela za članove */}
      {showMembers && (
        <div className="modal-overlay" onClick={() => setShowMembers(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2>Aktivni članovi</h2>
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table className="clubs-table" style={{ margin: "0 auto" }}>
                <thead>
                  <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Datum rođenja</th>
                    <th>Mjesto</th>
                    <th>Kategorija</th>
                    <th>Kilaza</th>
                    <th>Pojas</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m._id}>
                      <td>{m.name}</td>
                      <td>{m.surname}</td>
                      <td>{m.birthDate ? new Date(m.birthDate).toLocaleDateString() : ""}</td>
                      <td>{m.city}</td>
                      <td>{m.category}</td>
                      <td>{m.weight}</td>
                      <td>{m.belt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn-secondary" onClick={() => setShowMembers(false)} style={{ marginTop: "24px" }}>Zatvori</button>
          </div>
        </div>
      )}

      {/* Modal/tabela za događaje */}
      {showEvents && (
        <div className="modal-overlay" onClick={() => setShowEvents(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "12px",
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h2>Svi događaji</h2>
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table className="clubs-table" style={{ margin: "0 auto" }}>
                <thead>
                  <tr>
                    <th>Naziv</th>
                    <th>Organizator</th>
                    <th>Lokacija</th>
                    <th>Datum</th>
                    <th>Rok za prijavu</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev._id}>
                      <td>{ev.title}</td>
                      <td>{ev.organizer}</td>
                      <td>{ev.location}</td>
                      <td>{ev.startDate ? new Date(ev.startDate).toLocaleDateString() : ""}</td>
                      <td>{ev.deadline ? new Date(ev.deadline).toLocaleDateString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn-secondary" onClick={() => setShowEvents(false)} style={{ marginTop: "24px" }}>Zatvori</button>
          </div>
        </div>
      )}
    </div>
  );
}