import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarPage.css";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    organizer: "",
    place: "",
    time: "",
    deadline: "",
  });

  const handleDateClick = (value) => {
    setDate(value);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, date }]);
    setShowModal(false);
    setNewEvent({
      title: "",
      organizer: "",
      place: "",
      time: "",
      deadline: "",
    });
  };

  const dayEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <div className="calendar-page">
      <h1>Kalendar događaja</h1>
      <Calendar onClickDay={handleDateClick} value={date} />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{date.toLocaleDateString()}</h3>
            {dayEvents.length > 0 ? (
              <div>
                <h4>Događaji:</h4>
                <ul>
                  {dayEvents.map((event, idx) => (
                    <li key={idx}>
                      <strong>{event.title}</strong> <br />
                      Organizator: {event.organizer} <br />
                      Mjesto: {event.place} <br />
                      Početak: {event.time} <br />
                      Rok prijave: {event.deadline}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Nema događaja za ovaj datum.</p>
            )}
            <h4>Dodaj događaj:</h4>
            <input
              type="text"
              placeholder="Naziv takmičenja"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Organizator"
              value={newEvent.organizer}
              onChange={(e) =>
                setNewEvent({ ...newEvent, organizer: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mjesto"
              value={newEvent.place}
              onChange={(e) =>
                setNewEvent({ ...newEvent, place: e.target.value })
              }
            />
            <input
              type="time"
              placeholder="Vrijeme"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Rok prijave"
              value={newEvent.deadline}
              onChange={(e) =>
                setNewEvent({ ...newEvent, deadline: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button onClick={handleAddEvent}>Dodaj</button>
              <button onClick={() => setShowModal(false)}>Zatvori</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
