const path = require("path");
const express = require("express");

const clientsRoutes = require("./src/routes/clients.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// 1) JSON body
app.use(express.json());

// 2) Servir FRONT (public)
app.use(express.static(path.join(__dirname, "public")));

// 3) API
app.use("/api/clients", clientsRoutes);

// 4) 404 solo para rutas API (para que no rompa el frontend)
app.use("/api", (req, res) => {
  res.status(404).json({ ok: false, message: "Endpoint no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});