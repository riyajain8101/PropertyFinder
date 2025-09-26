import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Proxy API requests to your backend (ngrok/EC2) ---
const API_BASE = process.env.API_BASE || "https://<your-ngrok-url>";

app.use("/api", (req, res) => {
  const targetUrl = API_BASE + req.originalUrl;
  console.log(`🔄 Proxying ${req.method} ${req.originalUrl} -> ${targetUrl}`);
  res.redirect(307, targetUrl);
});

// --- Serve frontend build ---
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Frontend + API proxy running at http://0.0.0.0:${PORT}`);
});

/*
import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Needed because __dirname is not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Your existing API routes ---
import propertyRoutes from "./routes/propertyRoutes.js";
import neighborhoodRoutes from "./routes/neighborhoodRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

app.use("/api/properties", propertyRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/ads", adRoutes);

// Error handling middleware
app.use(errorHandler);

// --- Serve frontend build ---
app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
*/