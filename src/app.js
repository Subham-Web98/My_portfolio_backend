import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import projectsRouter from "./routes/project.routes.js";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Initialize dotenv configuration
dotenv.config({
  path: "./.env",
});

// Initialize PORT
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Common Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "client/build"))); // Serve static files from build

// Routes
app.use("/api/v1/projects", projectsRouter);

// Fallback route for React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});



export { app, PORT };
