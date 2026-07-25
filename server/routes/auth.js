import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/database.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here";
const JWT_EXPIRY = "7d";

// Mock user database (replace with real implementation)
const mockUsers = {
  "admin@swami.com": {
    id: "admin-001",
    email: "admin@swami.com",
    password: "admin123", // In production, hash this
    isAdmin: true,
  },
};

// Sign In
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = mockUsers[email];

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      session: { token },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// Sign Up
router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    if (mockUsers[email]) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const userId = `user-${Date.now()}`;
    const user = {
      id: userId,
      email,
      password, // In production, hash this
      isAdmin: false,
    };

    mockUsers[email] = user;

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      session: { token },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// Get Session
router.get("/session", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ user: null, session: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      },
      session: { token },
    });
  } catch (error) {
    res.json({ user: null, session: null });
  }
});

// Sign Out
router.post("/signout", (req, res) => {
  res.json({ message: "Signed out successfully" });
});

// Check admin role
router.get("/admin/check-role/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = Object.values(mockUsers).find((u) => u.id === userId);

    res.json({
      isAdmin: user?.isAdmin || false,
      userId,
    });
  } catch (error) {
    next(error);
  }
});

export default router;