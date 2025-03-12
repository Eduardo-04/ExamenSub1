import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise"; // Importa mysql2 para conectarse a la base de datos

dotenv.config({ path: "/home/taller4N/productos/src/.env" });

const app = express();
const port = process.env.PORT || 3001;

// Configuración de la base de datos
const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "eduardo",
  database: process.env.DB_NAME || "Taller4",
  port: parseInt(process.env.DB_PORT || "3306"),
};

// Crear un pool de conexiones
const connection = mysql.createPool(config);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("Hola Productos");
});

// Ruta para obtener todos los productos desde la base de datos
app.get("/productos/all", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM productos");
    res.json({ productos: rows });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación de productos corriendo en: http://localhost:${port}`);
});