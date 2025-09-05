import { useState, useEffect } from "react";
import "../styles/Clubs.css";
import "../styles/CalendarPage.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const localizer = momentLocalizer(moment);

export default function Calendar({ canAddEvents = true }) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    organizer: "",
    location: "",
    startDate: "",
    deadline: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");


    axios.get(`${API_BASE}/api/events`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setEvents(
          res.data.map((event) => ({
            id: event._id,
            title: event.title,
            organizer: event.organizer,
            location: event.location,
            start: new Date(event.startDate),
            end: new Date(event.startDate),
            deadline: event.deadline
          }))
        );
      })
      .catch((err) => console.error("Greška prilikom učitavanja događaja:", err));
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const clubId = userData.club;
      // Dodaj clubId u novi event
      const eventToSend = { ...newEvent, club: clubId };

      const res = await axios.post(`${API_BASE}/api/events`, eventToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const savedEvent = res.data;
      setEvents([
        ...events,
        {
          id: savedEvent._id,
          title: savedEvent.title,
          organizer: savedEvent.organizer,
          location: savedEvent.location,
          start: new Date(savedEvent.startDate),
          end: new Date(savedEvent.startDate),
          deadline: savedEvent.deadline
        },
      ]);
      setShowModal(false);
      setNewEvent({
        title: "",
        organizer: "",
        location: "",
        startDate: "",
        deadline: ""
      });
    } catch (err) {
      setError("Greška prilikom dodavanja događaja.");
    } finally {
      setSaving(false);
    }
  };

  // Navigacija
  const handleNavigate = (action) => {
    let newDate = date;
    switch (action) {
      case "TODAY":
        newDate = new Date();
        break;
      case "PREV":
        newDate = moment(date).subtract(1, view === "month" ? "months" : view === "week" ? "weeks" : "days").toDate();
        break;
      case "NEXT":
        newDate = moment(date).add(1, view === "month" ? "months" : view === "week" ? "weeks" : "days").toDate();
        break;
      default:
        break;
    }
    setDate(newDate);
  };

  // Promjena prikaza
  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="clubs-page">
      <div className="clubs-header">
        <h1>Kalendar događaja</h1>
        {canAddEvents && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            Dodaj događaj
          </button>
        )}
      </div>

      {/* Dugmad za navigaciju i prikaz */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button className="btn-secondary" onClick={() => handleNavigate("TODAY")}>Danas</button>
        <button className="btn-secondary" onClick={() => handleNavigate("PREV")}>Prethodni</button>
        <button className="btn-secondary" onClick={() => handleNavigate("NEXT")}>Sljedeći</button>
        <button className={`btn-secondary${view === "month" ? " active" : ""}`} onClick={() => handleViewChange("month")}>Mjesec</button>
        <button className={`btn-secondary${view === "week" ? " active" : ""}`} onClick={() => handleViewChange("week")}>Sedmica</button>
        <button className={`btn-secondary${view === "day" ? " active" : ""}`} onClick={() => handleViewChange("day")}>Dan</button>
        <button className={`btn-secondary${view === "agenda" ? " active" : ""}`} onClick={() => handleViewChange("agenda")}>Agenda</button>
      </div>

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

      {/* Modal za unos događaja */}
      {canAddEvents && showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">Dodaj novi događaj</h2>
            <form className="form-grid" onSubmit={handleAddEvent}>
              <div className="form-field">
                <label>Naziv događaja</label>
                <input
                  name="title"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Organizator</label>
                <input
                  name="organizer"
                  value={newEvent.organizer}
                  onChange={e => setNewEvent({ ...newEvent, organizer: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Lokacija</label>
                <input
                  name="location"
                  value={newEvent.location}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Datum i vrijeme početka</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={newEvent.startDate}
                  onChange={e => setNewEvent({ ...newEvent, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Rok za prijavu</label>
                <input
                  type="date"
                  name="deadline"
                  value={newEvent.deadline}
                  onChange={e => setNewEvent({ ...newEvent, deadline: e.target.value })}
                  required
                />
              </div>
              {error && <div className="form-error">{error}</div>}
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Spremanje…" : "Spremi događaj"}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Zatvori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal za detalje događaja */}
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