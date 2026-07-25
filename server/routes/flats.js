import express from "express";
import { query } from "../config/database.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get flats by project
router.get("/project/:projectId", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT * FROM flats WHERE project_id = $1 ORDER BY floor_number, flat_number",
      [req.params.projectId]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Get all flats
router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT f.*, p.name as project_name FROM flats f JOIN projects p ON f.project_id = p.id ORDER BY f.created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Get flat by ID
router.get("/:id", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT f.*, p.name as project_name FROM flats f JOIN projects p ON f.project_id = p.id WHERE f.id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Flat not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Create flat (admin only)
router.post("/", verifyAdmin, async (req, res, next) => {
  const {
    project_id,
    flat_number,
    floor_number,
    configuration,
    carpet_area,
    price,
    status,
    amenities,
  } = req.body;

  if (!project_id || !flat_number || !configuration) {
    return res
      .status(400)
      .json({
        error: "project_id, flat_number, and configuration are required",
      });
  }

  try {
    const result = await query(
      "INSERT INTO flats (project_id, flat_number, floor_number, configuration, carpet_area, price, status, amenities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        project_id,
        flat_number,
        floor_number || null,
        configuration,
        carpet_area || null,
        price || null,
        status || "available",
        amenities || [],
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Update flat (admin only)
router.put("/:id", verifyAdmin, async (req, res, next) => {
  const {
    flat_number,
    floor_number,
    configuration,
    carpet_area,
    price,
    status,
    amenities,
  } = req.body;

  try {
    const result = await query(
      "UPDATE flats SET flat_number = $1, floor_number = $2, configuration = $3, carpet_area = $4, price = $5, status = $6, amenities = $7, updated_at = NOW() WHERE id = $8 RETURNING *",
      [
        flat_number,
        floor_number,
        configuration,
        carpet_area,
        price,
        status,
        amenities,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Flat not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete flat (admin only)
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query("DELETE FROM flats WHERE id = $1 RETURNING id", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Flat not found" });
    }

    res.json({ message: "Flat deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;