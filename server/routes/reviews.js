import express from "express";
import { query } from "../config/database.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get approved reviews (public)
router.get("/", async (req, res, next) => {
  try {
    const approved = req.query.approved === "true";
    const sql = approved
      ? "SELECT * FROM reviews WHERE is_approved = true ORDER BY created_at DESC"
      : "SELECT * FROM reviews ORDER BY created_at DESC";

    const result = await query(sql);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Submit review (public)
router.post("/", async (req, res, next) => {
  const { name, email, rating, message } = req.body;

  if (!name || !email || !rating || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  try {
    const result = await query(
      "INSERT INTO reviews (name, email, rating, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, rating, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Approve review (admin only)
router.patch("/:id/approve", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query(
      "UPDATE reviews SET is_approved = true WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Reject review (admin only)
router.patch("/:id/reject", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query(
      "UPDATE reviews SET is_approved = false WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete review (admin only)
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query("DELETE FROM reviews WHERE id = $1 RETURNING id", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;