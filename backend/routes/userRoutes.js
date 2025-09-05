import express from "express";
import User from "../models/User.js";
import Club from "../models/Club.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Signin (kreiranje usera)
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // Provjeri postoji li klub s tim emailom
  const club = await Club.findOne({ email });
  if (!club) return res.status(403).json({ message: "Email nije dozvoljen za registraciju." });

  // Provjeri da li user već postoji
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "Email je već iskorišten." });

  // Kreiraj usera
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ club: club._id, email, password: hash });
  await user.save();
  res.status(201).json({ message: "Korisnik kreiran." });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Neispravan email ili lozinka." });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Neispravan email ili lozinka." });

  // Ovdje generisi JWT token i vrati ga
  res.status(200).json({ message: "Login uspješan", userId: user._id, clubId: user.club });
});

export default router;