import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projects.js";
import reviewRoutes from "./routes/reviews.js";
import enquiryRoutes from "./routes/enquiries.js";
import flatRoutes from "./routes/flats.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    status: err.status || 500,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});