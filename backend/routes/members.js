import express from "express";
import Member from "../models/Member.js";
import { authenticate } from "../middleware/authMiddleware.js"; // Dodaj import

const router = express.Router();

// Dohvati članove kluba (zaštićena ruta)
router.get("/", authenticate, async (req, res) => {
  try {
    // Ako je admin, vrati sve članove
    if (req.user.role === "admin") {
      const sortOrder = req.query.sort === "desc" ? -1 : 1;
      const members = await Member.find({}).sort({ _id: sortOrder });
      return res.status(200).json(members);
    }
    // Inače, vrati članove samo za klub korisnika
    const clubId = req.user.club;
    const sortOrder = req.query.sort === "desc" ? -1 : 1;
    const members = await Member.find({ club: clubId }).sort({ _id: sortOrder });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvaćanju članova." });
  }
});

// Dodaj člana (zaštićena ruta)
router.post("/", authenticate, async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("CLUB ID:", req.user.club); // Dodaj ovo!
    const clubId = req.user.club;
    if (!clubId) return res.status(400).json({ message: "Nema kluba za ovog korisnika." });

    const member = new Member({ ...req.body, club: clubId });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom spremanja člana." });
  }
});

// Arhiviraj člana
router.put("/:id/archive", authenticate, async (req, res) => {
  await Member.findByIdAndUpdate(req.params.id, { archived: true });
  res.json({ success: true });
});

// Vrati člana u aktivne
router.put("/:id/unarchive", authenticate, async (req, res) => {
  await Member.findByIdAndUpdate(req.params.id, { archived: false });
  res.json({ success: true });
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: "Član nije pronađen." });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Greška pri uređivanju člana." });
  }
});

export default router;