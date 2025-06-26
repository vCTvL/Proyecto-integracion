import pool from '../db.js';


//Esta funcion se encarga de obtener los detalles de un componente especificado por su tipo y id.
// El tipo puede ser procesador, gpu, ram, mobo, fuente, gabinete, hdd o ssd.
//// La funcion valida el tipo de componente y realiza una consulta a la base de datos para obtener los detalles.
async function detalle_componente(req, res) {
    const { tipo, id } = req.params;
    const tablasPermitidas = {
        procesador: 'procesadores',
        gpu: 'gpus',
        ram: 'rams',
        mobo: 'mobo',
        fuente: 'fuentes',
        gabinete: 'gabinetes',
        hdd: 'hdd',
        ssd: 'ssd'
    };

    const tabla = tablasPermitidas[tipo];
    if (!tabla) {
        return res.status(400).json({ error: 'Tipo de componente no válido' });
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Componente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el componente' });
    }
}

export const methods = {
    detalle_componente
};