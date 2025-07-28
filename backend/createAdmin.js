import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@tkabih.com';    // email
    const password = 'adminadmin';      // password

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin već postoji');
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = new User({ email, passwordHash, role: 'admin' });
    await admin.save();

    console.log('Admin uspješno kreiran');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
