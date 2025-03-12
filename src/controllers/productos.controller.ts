import { Request, Response } from "express";
import connection from "../models/DB.ts"; // Importa la conexión a la base de datos

// Función existente (devuelve un mensaje de bienvenida)
export const getAll = (req: Request, res: Response) => {
  res.status(200).json({
    mensaje: "Bienvenido Productos",
  });
};

// Nueva función para obtener los productos desde la base de datos
export const getProductosFromDB = async (req: Request, res: Response) => {
  try {
    // Consulta la base de datos para obtener todos los productos
    const [rows] = await connection.query("SELECT * FROM productos");

    // Devuelve los productos en formato JSON
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      success: false,
      message: "Error al obtener los productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};