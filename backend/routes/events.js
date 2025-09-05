import express from "express";
import Event from "../models/Event.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dodaj novi event
router.post("/", authenticate, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vrati sve evente (bez filtera)
router.get("/", authenticate, async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;