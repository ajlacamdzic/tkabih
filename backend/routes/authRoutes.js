import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Club from '../models/Club.js';
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pronađi usera
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Korisnik ne postoji." });
    }

    // Provjeri lozinku
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Pogrešna lozinka.' });
    }

    // Generiši token
    const token = jwt.sign(
      { userId: user._id, role: user.role, club: user.club },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      email: user.email,
      role: user.role,
      club: user.club
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Provjeri postoji li klub s tim emailom
    const club = await Club.findOne({ email });
    if (!club) {
      return res.status(403).json({ message: "Email nije dozvoljen za registraciju." });
    }

    // Provjeri da li user već postoji
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email je već iskorišten." });
    }

    // Kreiraj usera
    const passwordHash = await bcrypt.hash(password, 12);
    const user = new User({ email, passwordHash, role: "user", club: club._id });
    await user.save();

    // Generiši token
    const token = jwt.sign(
      { userId: user._id, role: user.role, clubId: user.club },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      email: user.email,
      role: user.role,
      club: user.club
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

export default router;

