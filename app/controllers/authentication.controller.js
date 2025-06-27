import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";
import pool from '../db.js';

dotenv.config();

async function login(req, res) {
    const { user, pass } = req.body;
    
    if (!user || !pass) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);
        
        if (rows.length === 0) {
            return res.status(400).send({ status: "Error", message: "Usuario incorrecto" });
        }

        const usuario = rows[0];
        const loginCorrecto = await bcryptjs.compare(pass, usuario.password);
        
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Contraseña incorrecta" });
        }

        const token = jsonwebtoken.sign(
            { user: usuario.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION });
                                        
        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        };          
        
        res.cookie("jwt", token, cookieOption);
        
        // Redirigir según el tipo de usuario
        if (user === "admin") { 
            res.send({ status: "ok", message: "Administrador loggeado", redirect: "/admin" });
        } else {
            res.send({ status: "ok", message: "Usuario loggeado", redirect: "/public" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }
}

async function register(req, res) {
    const { user, password, email } = req.body;
    
    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query('SELECT * FROM usuarios WHERE user = ? OR email = ?', [user, email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).send({ status: "Error", message: "Este usuario o email ya existe" });
        }

        // Hashear la contraseña
        const salt = await bcryptjs.genSalt(5);
        const hashpass = await bcryptjs.hash(password, salt);

        // Insertar nuevo usuario
        await pool.query(
            'INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)',
            [user, email, hashpass]
        );

        return res.status(201).send({ 
            status: "ok", 
            message: `Usuario ${user} agregado correctamente`, 
            redirect: "/" 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }
}

export const methods = {
    login,
    register
};