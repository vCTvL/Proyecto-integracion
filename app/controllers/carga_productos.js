import pool from '../db.js';
import userSingleton from '../userSingleton.js';

//Esta funciin carga los productos de la base de datos y los devuelve en formato JSON
// para que puedan ser utilizados en la aplicacin web. Se ejecutan todas las consultas en paralelo
//esta funcion lo que hace es llenar los combo box de la pagina public.html
async function carga_productos(req, res) {
    try {
        // Ejecutar todas las consultas en paralelo
        const [procesadores] = await pool.query('SELECT id, nombre FROM procesadores');
        const [rams] = await pool.query('SELECT id, nombre FROM rams');
        const [gpus] = await pool.query('SELECT id, nombre FROM gpus');
        const [mobos] = await pool.query('SELECT id, nombre FROM mobo');
        const [fuentes] = await pool.query('SELECT id, nombre FROM fuentes');
        const [gabinetes] = await pool.query('SELECT id, nombre FROM gabinetes');
        const [SSD] = await pool.query('SELECT id, nombre FROM ssd');
        const [HDD] = await pool.query('SELECT id, nombre FROM hdd');
        
        res.json({
            procesadores,
            rams,
            gpus,
            mobos,
            fuentes,
            gabinetes,
            SSD,
            HDD
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener componentes' });
    }
}

console.log("Usuario autenticado global:", userSingleton.getUser());

export const methods = {
    carga_productos
};