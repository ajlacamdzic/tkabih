import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  deadline: { type: Date, required: true }
});

export default mongoose.model("Event", EventSchema);
