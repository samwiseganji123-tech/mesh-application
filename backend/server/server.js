import dns from "node:dns";

dns.setServers(["8.8.8.8"]);

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Project Connect API!",
  });
});

// Health-check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Project Connect server is running!",
  });
});

// Start server only after MongoDB connects
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Project Connect server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();