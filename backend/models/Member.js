import mongoose from "mongoose";
const memberSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  surname: String,
  birthDate: Date,
  city: String,
  category: String,
  weight: String,
  belt: String,
  club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
  archived: {type: Boolean, default: false}
});
export default mongoose.model("Member", memberSchema);