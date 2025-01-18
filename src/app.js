import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import projectsRouter from "./routes/project.routes.js";

const app = express();

//Initialize dotenv configuration

dotenv.config({
  path: "./.env",
});

// Initialize PORT

const PORT = process.env.PORT || 8080;

//CORS configuration

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
//Common Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
app.use("/api/v1/projects", projectsRouter);

export { app, PORT };
