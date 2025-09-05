import { useEffect, useState } from "react";
import axios from "axios";
import ClubModal from "../components/ClubModal";
import "../styles/Clubs.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/clubs`);
      setClubs(res.data || []);
    } catch (err) {
      console.error("Greška pri dohvaćanju klubova:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="clubs-page">
      <div className="clubs-header">
        <h1>Klubovi</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Dodaj klub
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="empty">Učitavanje…</div>
        ) : clubs.length === 0 ? (
          <div className="empty">Još nema unesenih klubova.</div>
        ) : (
          <table className="clubs-table">
            <thead>
              <tr>
                <th>Naziv kluba</th>
                <th>Predsjednik</th>
                <th>Adresa</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.president}</td>
                  <td>{c.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ClubModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClubAdded={(newClub) => {
          setClubs((prev) => [...prev, newClub]);
          setShowModal(false);
        }}
      />
    </div>
  );
}
