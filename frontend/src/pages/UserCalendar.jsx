import { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarPage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const localizer = momentLocalizer(moment);

export default function UserCalendar() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(
          data.map(event => ({
            id: event._id,
            title: event.title,
            organizer: event.organizer,
            location: event.location,
            start: new Date(event.startDate),
            end: new Date(event.startDate),
            deadline: event.deadline
          }))
        );
      });
  }, []);

  return (
    <div>
      <h2>Kalendar događaja</h2>
      <div className="card">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "20px 0" }}
          messages={{
            next: "Sljedeći",
            previous: "Prethodni",
            today: "Danas",
            month: "Mjesec",
            week: "Sedmica",
            day: "Dan",
            agenda: "Agenda"
          }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          onSelectEvent={event => setSelectedEvent(event)}
        />
      </div>
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{selectedEvent.title}</h2>
            <p><b>Organizator:</b> {selectedEvent.organizer}</p>
            <p><b>Lokacija:</b> {selectedEvent.location}</p>
            <p><b>Početak:</b> {moment(selectedEvent.start).format("DD.MM.YYYY HH:mm")}</p>
            <p><b>Rok za prijavu:</b> {selectedEvent.deadline ? moment(selectedEvent.deadline).format("DD.MM.YYYY") : "-"}</p>
            <div className="form-actions">
              <button className="btn-secondary" onClick={() => setSelectedEvent(null)}>Zatvori</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}