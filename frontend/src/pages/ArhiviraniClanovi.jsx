import { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ArhiviraniClanovi() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const clubId = userData.club;
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/members?club=${clubId}&sort=desc`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMembers(Array.isArray(data) ? data.filter(m => m.archived) : []));
  }, []);
  const unarchiveMember = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/api/members/${id}/unarchive`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    setMembers(members => members.filter(m => m._id !== id));
  };
  return (
    <div>
      <h2>Arhivirani članovi</h2>
      <table className="clubs-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.surname}</td>
              <td>
                <button className="btn-secondary" onClick={() => unarchiveMember(m._id)}>Vrati u aktivne</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}