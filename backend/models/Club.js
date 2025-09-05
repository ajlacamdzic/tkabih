import mongoose from "mongoose";

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  president: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  dateJoined: { type: Date, required: true },
  
}, { timestamps: true });

export default mongoose.model("Club", ClubSchema);
