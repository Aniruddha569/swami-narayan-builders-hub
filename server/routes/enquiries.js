import express from "express";
import { query } from "../config/database.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Submit enquiry (public)
router.post("/", async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  try {
    const result = await query(
      "INSERT INTO enquiries (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone || null, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get all enquiries (admin only)
router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query(
      "SELECT * FROM enquiries ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Mark enquiry as read (admin only)
router.patch("/:id/read", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query(
      "UPDATE enquiries SET is_read = true WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete enquiry (admin only)
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query(
      "DELETE FROM enquiries WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;