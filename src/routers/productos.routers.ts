import { Router } from "express";
import { getAll, getProductosFromDB } from "../controllers/productos.controller"; // Importa ambas funciones

const ruta = Router();

// Ruta existente (devuelve un mensaje de bienvenida)
ruta.get("/all", getAll);

// Nueva ruta (obtiene los productos desde la base de datos)
ruta.get("/db", getProductosFromDB);

export default ruta;