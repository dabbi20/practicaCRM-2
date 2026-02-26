const express = require("express");

const clientsRoutes = require("./src/routes/clients.routes");

const app = express();
const PORT = 3000;

// Permite recibir JSON desde frontend externo
app.use(express.json());

// (IMPORTANTE) Permitir CORS para Glitch/Replit
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Rutas API
app.use("/api/clients", clientsRoutes);

// 404 general
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Endpoint no encontrado" });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});