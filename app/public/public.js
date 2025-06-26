document.getElementById('logout-btn').addEventListener("click",()=>{
    document.cookie='jwt=; Path=/; Expires=Thu,01 Jan 1970 00:00:01 GMT';
    document.location.href ="/"
})

document.addEventListener('DOMContentLoaded', async () => {

    try {
        // Obtener todos los componentes en una sola llamada
        const response = await fetch('http://localhost:4000/api/public');
        
        if (!response.ok) {
            throw new Error('Error al cargar componentes');
        }
        
        const { procesadores, rams, gpus, mobos, fuentes, gabinetes } = await response.json();
        
        // Función auxiliar para llenar combos
        const llenarCombo = (elementId, items) => {
            const combo = document.getElementById(elementId);
            combo.innerHTML = '<option value="">Seleccione...</option>';
            items.forEach(item => {
                const option = new Option(item.nombre, item.id);
                combo.add(option);
            });
        };
        
        // Llenar todos los combos
        llenarCombo('procesador-combo', procesadores);
        llenarCombo('ram-combo', rams);
        llenarCombo('gpu-combo', gpus);
        llenarCombo('mobo-combo', mobos);
        llenarCombo('fuente-combo', fuentes);
        llenarCombo('gabinete-combo', gabinetes);
        llenarCombo('hdd-combo', gabinetes);
        llenarCombo('ssd-combo', gabinetes);
        
    } catch (error) {
        console.error('Error:', error);
        // Manejar errores para cada combo si es necesario
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    // ...código para llenar los combos...

    const contenedorDetalles = document.getElementById('detalles-procesador');
    const contenidoDetalles = document.getElementById('detalles-contenido');

    // Función genérica para mostrar detalles
    async function mostrarDetalles(tipo, comboId) {
        const combo = document.getElementById(comboId);
        const id = combo.value;
        if (!id) {
            alert(`Por favor seleccione un ${tipo}`);
            return;
        }
        try {
            const response = await fetch(`/api/public/${tipo}/${id}`);
            if (!response.ok) throw new Error('Error al obtener detalles');
            const data = await response.json();

            // Personaliza la visualización según el tipo
            let html = '';
            for (const key in data) {
                html += `<p><strong>${key}:</strong> ${data[key]}</p>`;
            }
            contenidoDetalles.innerHTML = html;
            contenedorDetalles.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            contenidoDetalles.innerHTML = `<p class="error">Error al cargar los detalles de ${tipo}</p>`;
            contenedorDetalles.style.display = 'block';
        }
    }

    // Asigna el evento a todos los botones de detalles
    document.querySelectorAll('.detalle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tipo = btn.getAttribute('data-tipo');
            const comboId = btn.getAttribute('data-combo');
            mostrarDetalles(tipo, comboId);
        });
    });
});


// Utilidad para obtener el texto seleccionado de un combo
function getSelectedText(comboId) {
    const combo = document.getElementById(comboId);
    return combo.options[combo.selectedIndex]?.text || '';
}

// Utilidad para obtener el valor seleccionado de un combo
function getSelectedValue(comboId) {
    const combo = document.getElementById(comboId);
    return combo.value;
}

// IDs de combos y etiquetas
const componentes = [
    { tipo: 'procesador', combo: 'procesador-combo', label: 'Procesador' },
    { tipo: 'ram', combo: 'ram-combo', label: 'RAM' },
    { tipo: 'gpu', combo: 'gpu-combo', label: 'GPU' },
    { tipo: 'mobo', combo: 'mobo-combo', label: 'Placa Madre' },
    { tipo: 'hdd', combo: 'hdd-combo', label: 'Disco Duro' },
    { tipo: 'ssd', combo: 'ssd-combo', label: 'SSD' },
    { tipo: 'fuente', combo: 'fuente-combo', label: 'Fuente' },
    { tipo: 'gabinete', combo: 'gabinete-combo', label: 'Gabinete' }
];

// Evento para registrar el PC y mostrar resumen y recomendaciones
document.getElementById('btn-mi-pc').addEventListener('click', async () => {
    // Obtener IDs seleccionados
    const seleccion = {};
    let faltan = [];
    componentes.forEach(c => {
        const val = getSelectedValue(c.combo);
        if (!val) faltan.push(c.label);
        seleccion[c.tipo] = val;
    });
    if (faltan.length > 0) {
        alert('Por favor selecciona: ' + faltan.join(', '));
        return;
    }

    // Obtener detalles de cada componente
    const detalles = {};
    for (const c of componentes) {
        try {
            const res = await fetch(`/api/public/${c.tipo}/${seleccion[c.tipo]}`);
            if (!res.ok) throw new Error();
            detalles[c.tipo] = await res.json();
        } catch {
            detalles[c.tipo] = { nombre: '[Error al obtener]' };
        }
    }

    // Mostrar resumen
    const resumenDiv = document.getElementById('mi-pc-detalles');
    let resumenHtml = '';
    componentes.forEach(c => {
        resumenHtml += `<p><strong>${c.label}:</strong> ${detalles[c.tipo]?.nombre || '[No seleccionado]'}</p>`;
    });
    resumenDiv.innerHTML = resumenHtml;
    document.getElementById('mi-pc-resumen').style.display = 'block';

    // Analizar y recomendar mejoras
    const recomendaciones = [];
    // Ejemplo simple de análisis:
    // 1. RAM baja
    if (detalles.ram && detalles.ram.frecuencia && detalles.ram.frecuencia < 2666) {
        recomendaciones.push('Tu RAM es de baja frecuencia. Considera actualizar a una RAM de al menos 2666 MHz.');
    }
    if (detalles.ram && detalles.ram.nombre && detalles.ram.nombre.match(/4\s?GB/i)) {
        recomendaciones.push('Tienes solo 4GB de RAM. Se recomienda al menos 8GB para un mejor rendimiento.');
    }
    // 2. GPU potente y procesador débil
    if (detalles.gpu && detalles.gpu.memoria && detalles.procesador && detalles.procesador.nucleos) {
        if (detalles.gpu.memoria >= 16 && detalles.procesador.nucleos <= 4) {
            recomendaciones.push('Tu GPU es muy potente para tu procesador. Considera actualizar el procesador para evitar cuellos de botella.');
        }
    }
    // 3. SSD ausente
    if (detalles.ssd && detalles.ssd.nombre && detalles.ssd.nombre.toLowerCase().includes('no')) {
        recomendaciones.push('No tienes SSD. Instalar uno mejorará mucho la velocidad del sistema.');
    }
    // 4. Fuente insuficiente para GPU potente
    if (detalles.fuente && detalles.fuente.watts && detalles.gpu && detalles.gpu.memoria) {
        if (detalles.gpu.memoria >= 16 && detalles.fuente.watts < 650) {
            recomendaciones.push('Tu fuente podría ser insuficiente para tu GPU. Considera una fuente de al menos 650W.');
        }
    }
    // 5. Procesador antiguo
    if (detalles.procesador && detalles.procesador.nombre && detalles.procesador.nombre.match(/i[357]-[0-7]\d{3}/i)) {
        recomendaciones.push('Tu procesador es de una generación antigua. Considera actualizarlo para mejor compatibilidad.');
    }

    // 6. Validación de socket entre procesador y placa madre
    if (
        detalles.procesador && detalles.mobo &&
        detalles.procesador.socket && detalles.mobo.socket &&
        detalles.procesador.socket !== detalles.mobo.socket
    ) {
        recomendaciones.push('Error de socket: El procesador y la placa madre seleccionados tienen sockets incompatibles.');
    }

    // 7. Capacidad de RAM baja para gaming/uso profesional
    if (detalles.ram && detalles.ram.nombre) {
        const match = detalles.ram.nombre.match(/(\d+)\s?GB/i);
        if (match && parseInt(match[1]) < 16) {
            recomendaciones.push('Para gaming o uso profesional, se recomienda al menos 16GB de RAM.');
        }
    }

    // 8. Capacidad de SSD baja
    if (detalles.ssd && detalles.ssd.capacidad && detalles.ssd.capacidad < 480) {
        recomendaciones.push('Tu SSD tiene poca capacidad. Considera uno de al menos 480GB para sistema y programas.');
    }

    // 9. Capacidad de HDD baja
    if (detalles.hdd && detalles.hdd.capacidad && detalles.hdd.capacidad < 2) {
        recomendaciones.push('Tu disco duro tiene poca capacidad. Considera uno de al menos 2TB para almacenamiento de datos.');
    }

    // 10. Fuente de poder no modular
    if (detalles.fuente && detalles.fuente.modular && detalles.fuente.modular.toLowerCase() === 'no') {
        recomendaciones.push('Tu fuente de poder no es modular. Considera una modular para mejor gestión de cables y flujo de aire.');
    }

    // 11. Gabinete pequeño para GPU grande
    if (detalles.gabinete && detalles.gabinete.tamanio && detalles.gpu && detalles.gpu.memoria) {
        if (
            detalles.gabinete.tamanio.toLowerCase().includes('mini') &&
            detalles.gpu.memoria >= 12
        ) {
            recomendaciones.push('Tu gabinete es pequeño para una GPU grande. Verifica compatibilidad de tamaño físico.');
        }
    }

    // 12. Placa madre antigua para CPU/GPU modernos
    if (detalles.mobo && detalles.mobo.anio_lanzamiento && detalles.mobo.anio_lanzamiento < 2020) {
        recomendaciones.push('Tu placa madre es de una generación anterior. Puede limitar el rendimiento de componentes modernos.');
    }

    // 13. GPU antigua para gaming actual
    if (detalles.gpu && detalles.gpu.anio_lanzamiento && detalles.gpu.anio_lanzamiento < 2020) {
        recomendaciones.push('Tu GPU es de una generación anterior. Considera actualizarla para juegos actuales.');
    }

    // 14. Procesador con pocos núcleos para multitarea
    if (detalles.procesador && detalles.procesador.nucleos && detalles.procesador.nucleos < 6) {
        recomendaciones.push('Tu procesador tiene pocos núcleos. Para multitarea y productividad, se recomienda al menos 6 núcleos.');
    }

    // 15. Falta de GPU dedicada (si GPU es integrada)
    if (detalles.gpu && detalles.gpu.nombre && detalles.gpu.nombre.toLowerCase().includes('integrada')) {
        recomendaciones.push('No tienes una GPU dedicada. Considera agregar una para mejor rendimiento gráfico.');
    }

    // 16. SSD ausente o solo HDD
    if (detalles.ssd && detalles.ssd.nombre && detalles.ssd.nombre.toLowerCase().includes('no')) {
        recomendaciones.push('No tienes SSD. Instalar uno mejorará mucho la velocidad del sistema.');
    }
    // 17. General: Si no hay recomendaciones
    if (recomendaciones.length === 0) {
        recomendaciones.push('¡Tu configuración es equilibrada! No se detectan mejoras urgentes.');
    }

    document.getElementById('mi-pc-recomendaciones').innerHTML = recomendaciones.map(r => `<li>${r}</li>`).join('');
});

