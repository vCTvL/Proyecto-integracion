import express from 'express'
import dotenv from 'dotenv';
import path from "path"
import { fileURLToPath } from 'url';
import { methods as authentication } from "./controllers/authentication.controller.js"
import bcrypt from 'bcryptjs';
import { methods as authorization } from "./middlewares/authorization.js"
import cookieParser from 'cookie-parser'
import { methods as metodo } from "./controllers/carga_productos.js"
import { methods as detalleComponente } from "./controllers/detalle-componentes.js";
import pool from './db.js';
import jwt from 'jsonwebtoken';
const __dirname = path.dirname(fileURLToPath(import.meta.url))


dotenv.config();
const app = express()
app.set("port", 4000);
app.listen(app.get("port"));
console.log("servidor corriendo en puerto", app.get("port"))
app.use(express.json());
app.use(cookieParser())

//CONFIGURACION
app.use(express.static(__dirname + "/public"));



//RUTAS



app.get("/", authorization.middleware, (req, res) => {
    res.sendFile(__dirname + "/pages/login.html")
})

app.get("/register", authorization.middleware, (req, res) => {
    res.sendFile(__dirname + "/pages/register.html")
})

app.get("/admin", authorization.middleware, (req, res) => {
    res.sendFile(__dirname + "/pages/admin/admin.html")
})

app.get('/public', authorization.middleware, async (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/public.html"));

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
        procesadores: ['nombre', 'marca', 'nucleos', 'frecuencia_base', 'socket', 'precio'],
        mobo: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'socket', 'precio'],
        rams: ['nombre', 'marca', 'frecuencia', 'anio_lanzamiento', 'precio'],
        gabinetes: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'precio'],
        fuentes: ['nombre', 'marca', 'watts', 'modular', 'anio_lanzamiento', 'precio'],
        gpus: ['nombre', 'marca', 'memoria', 'anio_lanzamiento', 'precio'],
        ssd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento', 'precio'],
        hdd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento', 'precio']
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
        procesadores: ['nombre', 'marca', 'nucleos', 'frecuencia_base', 'socket', 'precio'],
        mobo: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'socket', 'precio'],
        rams: ['nombre', 'marca', 'frecuencia', 'anio_lanzamiento', 'precio'],
        gabinetes: ['nombre', 'marca', 'tamanio', 'anio_lanzamiento', 'precio'],
        fuentes: ['nombre', 'marca', 'watts', 'modular', 'anio_lanzamiento', 'precio'],
        gpus: ['nombre', 'marca', 'memoria', 'anio_lanzamiento', 'precio'],
        ssd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento', 'precio'],
        hdd: ['nombre', 'marca', 'capacidad', 'anio_lanzamiento', 'precio']
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

// Endpoint para registrar compra desde el área pública
app.post('/api/public/comprar', async (req, res) => {
    try {
        const { idProducto, cantidad, precio, componentes} = req.body;
        console.log("Datos de compra recibidos:", req.body);
        let idUsuario = null; // Debes declarar idUsuario aquí

        // Obtener idUsuario desde JWT
        try {
            const token = req.cookies.jwt;
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const [rows] = await pool.query('SELECT id FROM usuarios WHERE user = ?', [decoded.user]);
                if (rows.length > 0) idUsuario = rows[0].id;
            }
        } catch (e) {
            // Si no hay usuario, idUsuario queda null
        }
        console.log("ID del usuario autenticado:", idUsuario);
        if (!idProducto || !cantidad || !precio) {
            return res.status(400).json({ error: 'Faltan datos para la compra' });
        }

        // 1. Insertar en detalleventa (sin idVenta aún)
        const [result] = await pool.query(
            'INSERT INTO detalleventa (idProducto, cantidad, total) VALUES (?, ?, ?)',
            [idProducto, cantidad, precio * cantidad]
        );
        let detalleventaid = result.insertId; // Obtener el ID del detalleventa recién insertado

        // 2. INSERTAR EN VENTAMAESTRA
        const [ventaResult] = await pool.query(
            'INSERT INTO ventamaestra (idUsuario, idDetalle) VALUES (?, ?)',
            [idUsuario, detalleventaid]
        );
        const idVenta = ventaResult.insertId;

        // 3. update de idventa en detalleventa
        await pool.query(
            'UPDATE detalleventa SET idVenta = ? ',
            [idVenta]
        );
        // 4. insertar los ids de los componentes en la tabla componentes
        if (componentes) {
            const {
                idGabinete = null,
                idGPU = null,
                idProcesador = null,
                idMobo = null,
                idHdd = null,
                idSsd = null,
                idRam = null,
                idFuente = null
            } = componentes;
            await pool.query(
                `INSERT INTO componentes (
                    idGabinete,
                    idGPU,
                    idProcesador,
                    idMobo,
                    idHdd,
                    idSsd,
                    idRam,
                    idFuente
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [idGabinete, idGPU, idProcesador, idMobo, idHdd, idSsd, idRam, idFuente]
            );
        }

        res.status(201).json({ status: 'ok', message: 'Compra registrada' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar la compra', detalle: err.message });
    }
});



