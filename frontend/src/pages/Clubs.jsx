import { useEffect, useState } from 'react';
import axios from 'axios';
import ClubModal from '../components/ClubModal';

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="clubs-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Klubovi</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj klub
        </button>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Naziv kluba</th>
            <th className="border px-4 py-2">Predsjednik</th>
            <th className="border px-4 py-2">Grad</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{club.name}</td>
              <td className="border px-4 py-2">{club.president}</td>
              <td className="border px-4 py-2">{club.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClubModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClubAdded={() => {
          setShowModal(false);
          fetchClubs();
        }}
      />
    </div>
  );
}
