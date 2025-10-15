import express from "express";
import productosRouter from "./routes/productos.routes.js";

const app = express();

// Modo de ejecución: fs o mock
const modo = process.argv[2] || "fs";
const modosValidos = ["fs", "mock"];

if (!modo || !modosValidos.includes(modo)) {
  console.error(`❌ Modo no válido. Usar "fs" o "mock". Ejemplo: npm run fs`);
  process.exit(1);
}

app.locals.modo = modo;
console.log(`🟢 Server running in mode: ${modo}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/productos", productosRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
