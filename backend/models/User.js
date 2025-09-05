import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
