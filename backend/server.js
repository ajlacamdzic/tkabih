import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Club from './models/Club.js'; 
import clubRoutes from './routes/clubs.js';
import eventRoutes from "./routes/events.js";
import authRoutes from './routes/authRoutes.js'
import membersRoutes from "./routes/members.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Pogrešan email ili lozinka' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Pogrešan email ili lozinka' });

    const token = jwt.sign(
      { userId: user._id, role: user.role, club: user.club }, // club mora biti tu!
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Dodaj club u odgovor!
    res.json({ 
      token, 
      email: user.email, 
      role: user.role, 
      club: user.club 
    });
  } catch (error) {
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

// DODAVANJE KLUBA
app.post('/api/clubs', async (req, res) => {
  try {
    const { name, president, city, email, dateJoined } = req.body;

    const club = new Club({
      name,
      president,
      city,
      email,
      dateJoined
    });

    await club.save();
    res.status(201).json({ club });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška prilikom dodavanja kluba.' });
  }
});

// LISTANJE KLUBOVA
app.get('/api/clubs', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom učitavanja klubova.' });
  }
});

app.use('/api/clubs', clubRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/members", membersRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
