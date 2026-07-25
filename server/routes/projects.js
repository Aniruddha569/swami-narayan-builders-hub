import express from "express";
import { query } from "../config/database.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Get project by ID
router.get("/:id", async (req, res, next) => {
  try {
    const result = await query("SELECT * FROM projects WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get flats for a project
router.get("/:projectId/flats", async (req, res, next) => {
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

// Create project (admin only)
router.post("/", verifyAdmin, async (req, res, next) => {
  const { name, location, description, status, images } = req.body;

  if (!name || !location) {
    return res
      .status(400)
      .json({ error: "Name and location are required" });
  }

  try {
    const result = await query(
      "INSERT INTO projects (name, location, description, status, images) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, location, description || null, status || "ongoing", images || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Update project (admin only)
router.put("/:id", verifyAdmin, async (req, res, next) => {
  const { name, location, description, status, images } = req.body;

  try {
    const result = await query(
      "UPDATE projects SET name = $1, location = $2, description = $3, status = $4, images = $5, updated_at = NOW() WHERE id = $6 RETURNING *",
      [name, location, description, status, images, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete project (admin only)
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const result = await query("DELETE FROM projects WHERE id = $1 RETURNING id", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully", id: result.rows[0].id });
  } catch (error) {
    next(error);
  }
});

export default router;