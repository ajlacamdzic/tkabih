import express from "express";
import Club from "../models/Club.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all clubs
router.get("/", authenticate, async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE club
router.post("/", async (req, res) => {
  try {
    const newClub = new Club(req.body);
    await newClub.save();
    res.status(201).json(newClub);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
