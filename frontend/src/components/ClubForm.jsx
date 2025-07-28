import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Clubs.css';
import ClubModal from '../components/ClubModal';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [president, setPresident] = useState('');
  const [address, setAddress] = useState('');
  const [activeMembers, setActiveMembers] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clubs');
      setClubs(res.data);
    } catch (err) {
      console.error('Greška pri dohvaćanju klubova:', err);
    }
  };

  const handleAddClub = async (e) => {
    e.preventDefault();
    try {
      const newClub = {
        name,
        president,
        address,
        activeMembers: Number(activeMembers),
        joinedDate: joinedDate ? new Date(joinedDate) : new Date(),
      };
      const res = await axios.post('http://localhost:5000/api/clubs', newClub);
      setMessage(res.data.message);
      setShowModal(false);
      fetchClubs(); // Refresh list
      // Reset form
      setName('');
      setPresident('');
      setAddress('');
      setActiveMembers('');
      setJoinedDate('');
    } catch (err) {
      console.error('Greška pri dodavanju:', err);
      setMessage('Greška pri dodavanju kluba.');
    }
  };

  return (
    <div className="clubs-container">
      <div className="clubs-header">
        <h1>Klubovi</h1>
        <button onClick={() => setShowModal(true)} className="add-club-btn">
          Dodaj klub
        </button>
      </div>

      <table className="clubs-table">
        <thead>
          <tr>
            <th>Naziv kluba</th>
            <th>Predsjednik</th>
            <th>Adresa</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, index) => (
            <tr key={index}>
              <td>{club.name}</td>
              <td>{club.president}</td>
              <td>{club.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Dodaj novi klub</h2>
            <form onSubmit={handleAddClub} className="modal-form">
              <input
                type="text"
                placeholder="Naziv kluba"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Predsjednik"
                value={president}
                onChange={(e) => setPresident(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Adresa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="number"
                placeholder="Broj aktivnih članova"
                value={activeMembers}
                onChange={(e) => setActiveMembers(e.target.value)}
              />
              <input
                type="date"
                placeholder="Datum pristupa"
                value={joinedDate}
                onChange={(e) => setJoinedDate(e.target.value)}
              />
              <div className="modal-buttons">
                <button type="submit">Spremi</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Otkaži
                </button>
              </div>
              {message && <p className="form-message">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
