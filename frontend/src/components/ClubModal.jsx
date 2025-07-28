import ClubForm from './ClubForm';

export default function ClubModal({ isOpen, onClose, onClubAdded }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
        <div className="text-center mb-4">
          
        </div>
        <ClubForm onClubAdded={onClubAdded} onClose={onClose} />
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full"
        >
          Zatvori
        </button>
      </div>
    </div>
  );
}
