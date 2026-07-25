import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Database connected successfully");
    client.release();
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export const query = (text, params) => pool.query(text, params);

export default pool;