import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

async function revisarCookie(req) {
    try {
        if (!req.headers.cookie) return false;
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt="));
        if (!cookieJWT) return false;
        const token = cookieJWT.slice(4);
        const decodificada = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        // Buscar usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [decodificada.user]);
        if (rows.length === 0) return false;
        return rows[0].user;
    } catch {
        return false;
    }
}

async function middleware(req, res, next) {
    const usuario = await revisarCookie(req);
    if (!usuario) return next(); // No logueado, permite ver login/register

    // Evitar bucle de redirección: si ya está en la ruta correcta, continuar
    if (usuario === "admin") {
        if (req.path === "/admin") return next();
        return res.redirect("/admin");
    } else {
        if (req.path === "/public") return next();
        return res.redirect("/public");
    }
}

export const methods = {
    middleware
};