import express from 'express';
import Club from '../models/Club.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newClub = new Club(req.body);
    await newClub.save();
    res.status(201).json(newClub);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom dodavanja kluba.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom učitavanja klubova.' });
  }
});

export default router;
