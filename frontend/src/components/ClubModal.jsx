import ClubForm from "./ClubForm";
import "../styles/Clubs.css";

export default function ClubModal({ isOpen, onClose, onClubAdded }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Dodaj novi klub</h2>

        <ClubForm
          onClose={onClose}
          onClubAdded={onClubAdded}
        />

        
      </div>
    </div>
  );
}
