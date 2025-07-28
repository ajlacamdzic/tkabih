import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  president: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joinedDate: {
    type: Date,
    required: true
  },
  activeMembers: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Club', clubSchema);
