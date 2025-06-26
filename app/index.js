import express from 'express'
import dotenv from 'dotenv';
import path from "path"
import { fileURLToPath } from 'url';
import {methods as authentication} from "./controllers/authentication.controller.js"
import bcrypt from 'bcryptjs';
import {methods as authorization} from "./middlewares/authorization.js"
import cookieParser from 'cookie-parser'
import {methods as metodo} from "./controllers/carga_productos.js"
import {methods as detalleComponente} from "./controllers/detalle-componentes.js";
import pool from './db.js';
const __dirname= path.dirname(fileURLToPath(import.meta.url))


dotenv.config();
const app= express()
app.set("port",4000);
app.listen(app.get("port"));
console.log("servidor corriendo en puerto", app.get("port"))
app.use(express.json());
app.use(cookieParser())

//CONFIGURACION
app.use(express.static(__dirname + "/public"));


//RUTAS



app.get("/", authorization.middleware, (req,res)=>{
    res.sendFile(__dirname+"/pages/login.html")
})

app.get("/register",authorization.middleware, (req,res)=>{
    res.sendFile(__dirname+"/pages/register.html")
})

app.get("/admin", authorization.middleware,(req,res)=>{
    res.sendFile(__dirname+"/pages/admin/admin.html")
})

app.get('/public', authorization.middleware, async (req,res)=> {
    res.sendFile(path.join(__dirname+"/pages/public.html"));
    
});

app.post("/api/register", authentication.register)

app.post("/api/login", authentication.login)

app.get("/api/public", metodo.carga_productos)



app.get("/api/public/:tipo/:id", detalleComponente.detalle_componente);




// Endpoint para mostrar la base de datos (solo para admin)
app.get('/api/admin/db', async (req, res) => {
    try {
        // Puedes agregar autenticación aquí si lo deseas
        const tablas = [
            'procesadores', 'gpus', 'rams', 'mobo', 'fuentes', 'gabinetes', 'ssd', 'hdd', 'usuarios'
        ];
        const resultado = {};
        for (const tabla of tablas) {
            const [rows] = await pool.query(`SELECT * FROM ${tabla}`);
            resultado[tabla] = rows;
        }
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la base de datos' });
    }
});

// Obtener todos los productos de una tabla (admin)
app.get('/api/admin/:tabla', async (req, res) => {
    const tabla = req.params.tabla;
    const tablasPermitidas = [
        'procesadores', 'mobo', 'rams', 'gabinetes', 'fuentes', 'gpus', 'ssd', 'hdd'
    ];
    if (!tablasPermitidas.includes(tabla)) {
        return res.status(400).json({ error: 'Tabla no permitida' });
    }
    try {
        const [rows] = await pool.query(`SELECT * FROM ${tabla}`);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Eliminar producto por id (admin)
app.delete('/api/admin/:tabla/:id', async (req, res) => {
    const tabla = req.params.tabla;
    const id = req.params.id;
    const tablasPermitidas = [
        'procesadores', 'mobo', 'rams', 'gabinetes', 'fuentes', 'gpus', 'ssd', 'hdd'
    ];
    if (!tablasPermitidas.includes(tabla)) {
        return res.status(400).json({ error: 'Tabla no permitida' });
    }
    try {
        const [result] = await pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ status: 'ok', message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Endpoint para agregar productos a cualquier tabla (admin)
app.post('/api/admin/:tabla', async (req, res) => {
    console.log('POST /api/admin/:tabla', req.params.tabla, req.body); // <-- Para depuración
    const tabla = req.params.tabla;
    const datos = req.body;

    // Define los campos permitidos por tabla
    const camposPorTabla = {
        procesadores: ['nombre', 'marca', 'nucleos', 'frecuencia_base', 'socket'],
        mobo: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'socket'], 
        rams: ['nombre', 'marca', 'frecuencia', 'anio_lanzamiento'],
        gabinetes: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento'],
        fuentes: ['nombre', 'marca', 'watts', 'modular', 'anio_lanzamiento'],
        gpus: ['nombre', 'marca', 'memoria', 'anio_lanzamiento'],
        ssd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento'],
        hdd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento']
    };

    if (!camposPorTabla[tabla]) {
        return res.status(400).json({ error: 'Tabla no permitida' });
    }

    // Validar que todos los campos requeridos estén presentes y no vacíos
    const campos = camposPorTabla[tabla];
    for (const campo of campos) {
        if (
            typeof datos[campo] === 'undefined' ||
            datos[campo] === null ||
            datos[campo] === ''
        ) {
            return res.status(400).json({ error: `Falta el campo requerido: ${campo}` });
        }
    }

    const valores = campos.map(c => datos[c]);
    const placeholders = campos.map(() => '?').join(',');

    try {
        await pool.query(
            `INSERT INTO ${tabla} (${campos.join(',')}) VALUES (${placeholders})`,
            valores
        );
        res.status(201).json({ status: 'ok', message: 'Producto agregado' });
    } catch (err) {
        console.error('Error al agregar producto:', err);
        res.status(500).json({ error: 'Error al agregar producto', detalle: err.message });
    }
});

// Editar producto por id (admin)
app.put('/api/admin/:tabla/:id', async (req, res) => {
    const tabla = req.params.tabla;
    const id = req.params.id;
    const datos = req.body;
    const camposPorTabla = {
        procesadores: ['nombre', 'marca', 'nucleos', 'frecuencia_base', 'socket'],
        mobo: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'socket'],
        rams: ['nombre', 'marca', 'frecuencia', 'anio_lanzamiento'],
        gabinetes: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento'],
        fuentes: ['nombre', 'marca', 'watts', 'modular', 'anio_lanzamiento'],
        gpus: ['nombre', 'marca', 'memoria', 'anio_lanzamiento'],
        ssd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento'],
        hdd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento']
    };
    if (!camposPorTabla[tabla]) {
        return res.status(400).json({ error: 'Tabla no permitida' });
    }
    const campos = camposPorTabla[tabla];
    const setClause = campos.map(c => `${c} = ?`).join(', ');
    const valores = campos.map(c => datos[c]);
    valores.push(id);
    try {
        const [result] = await pool.query(
            `UPDATE ${tabla} SET ${setClause} WHERE id = ?`,
            valores
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ status: 'ok', message: 'Producto editado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al editar producto' });
    }
});



