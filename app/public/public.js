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

    // Botón comprar (se crea una sola vez)
    let btnComprar = document.createElement('button');
    btnComprar.textContent = 'Comprar';
    btnComprar.className = 'detalle-btn';
    btnComprar.style.marginTop = '16px';
    btnComprar.style.display = 'none';
    btnComprar.disabled = true; // Inicialmente deshabilitado
    // Insertar el botón al final del contenedor de detalles
    contenedorDetalles.appendChild(btnComprar);

    // --- NUEVO: Control de habilitación del botón comprar ---
    // IDs de los combos requeridos
    const comboIds = [
        'procesador-combo',
        'ram-combo',
        'gpu-combo',
        'mobo-combo',
        'hdd-combo',
        'ssd-combo',
        'fuente-combo',
        'gabinete-combo'
    ];

    // Función para verificar si todos los combos tienen selección válida
    function actualizarEstadoBotonComprar() {
        const todosSeleccionados = comboIds.every(id => {
            const el = document.getElementById(id);
            return el && el.value && el.value !== '';
        });
        btnComprar.disabled = !todosSeleccionados;
    }

    // Asignar evento change a todos los combos
    comboIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', actualizarEstadoBotonComprar);
        }
    });

    // Llamar al menos una vez al cargar
    actualizarEstadoBotonComprar();

    // Función genérica para mostrar detalles
    async function mostrarDetalles(tipo, comboId, idForzar = null) {
        const combo = document.getElementById(comboId);
        const id = idForzar || combo.value;
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

            // Mostrar el botón comprar y guardar info del producto
            btnComprar.style.display = 'block';
            btnComprar.dataset.tipo = tipo;
            btnComprar.dataset.id = id;
            btnComprar.dataset.nombre = data.nombre || '';
            btnComprar.dataset.precio = data.precio || '0';
            actualizarEstadoBotonComprar(); // Actualiza el estado al mostrar detalles
        } catch (error) {
            console.error('Error:', error);
            contenidoDetalles.innerHTML = `<p class="error">Error al cargar los detalles de ${tipo}</p>`;
            contenedorDetalles.style.display = 'block';
            btnComprar.style.display = 'none';
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

    // Evento para botón comprar
    btnComprar.addEventListener('click', async function () {
        const tipo = btnComprar.dataset.tipo;
        const idProducto = btnComprar.dataset.id;
        const precio = btnComprar.dataset.precio;
        if (!tipo || !idProducto || !precio) return;
        if (!confirm('¿Seguro que deseas comprar el producto?')) return;
        // Lógica para registrar la compra
        console.log(`Comprando ${tipo} con ID: ${idProducto} y precio: ${precio}`);

        // Obtener todos los ids de los combos seleccionados
        const idsComponentes = {
            idGabinete: getSelectedValue('gabinete-combo'),
            idGPU: getSelectedValue('gpu-combo'),
            idProcesador: getSelectedValue('procesador-combo'),
            idMobo: getSelectedValue('mobo-combo'),
            idHdd: getSelectedValue('hdd-combo'),
            idSsd: getSelectedValue('ssd-combo'),
            idRam: getSelectedValue('ram-combo'),
            idFuente: getSelectedValue('fuente-combo')
        };

        try {
            // Registrar la compra
            const body = {
                idProducto: idProducto,
                cantidad: 1,
                precio: precio,
                componentes: idsComponentes // enviar los ids de componentes
            };
            const res = await fetch('/api/public/comprar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error();
            // Mensaje de éxito
            const msg = document.createElement('div');
            msg.textContent = '¡Producto comprado exitosamente!';
            msg.style.color = '#16a34a';
            msg.style.marginTop = '10px';
            contenidoDetalles.appendChild(msg);
            setTimeout(() => { msg.remove(); }, 2000);
        } catch {
            alert('Error al registrar la compra');
        }
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

    // Mostrar recomendaciones
    document.getElementById('mi-pc-recomendaciones').innerHTML = recomendaciones.map(r => `<li>${r}</li>`).join('');

    // Mostrar sugerencias de componentes compatibles si hay recomendaciones
    const sugerenciasDivId = 'mi-pc-sugerencias';
    let sugerenciasDiv = document.getElementById(sugerenciasDivId);
    if (!sugerenciasDiv) {
        sugerenciasDiv = document.createElement('div');
        sugerenciasDiv.id = sugerenciasDivId;
        document.getElementById('mi-pc-resumen').appendChild(sugerenciasDiv);
    }
    sugerenciasDiv.innerHTML = '';

    // --- NUEVO: Sugerencias robustas por tipo de recomendación ---
    if (recomendaciones.length > 0 && recomendaciones[0].indexOf('¡Tu configuración es equilibrada!') === -1) {
        // Determinar el tipo de componente a sugerir según la recomendación
        let sugerencias = [];
        let tipoSugerido = null;

        // Busca el tipo de recomendación principal (puedes mejorar el análisis si tienes varias recomendaciones)
        const rec = recomendaciones[0].toLowerCase();

        if (rec.includes('gpu')) tipoSugerido = 'gpu';
        else if (rec.includes('procesador')) tipoSugerido = 'procesador';
        else if (rec.includes('ram')) tipoSugerido = 'ram';
        else if (rec.includes('gabinete')) tipoSugerido = 'gabinete';
        else if (rec.includes('placa madre') || rec.includes('mobo')) tipoSugerido = 'mobo';
        else if (rec.includes('fuente')) tipoSugerido = 'fuente';
        else if (rec.includes('ssd')) tipoSugerido = 'ssd';
        else if (rec.includes('disco duro') || rec.includes('hdd')) tipoSugerido = 'hdd';

        // Si no se detecta tipo, no sugerir nada
        if (tipoSugerido) {
            try {
                const res = await fetch(`/api/admin/${tipoSugerido === 'procesador' ? 'procesadores' : tipoSugerido === 'ram' ? 'rams' : tipoSugerido === 'gabinete' ? 'gabinetes' : tipoSugerido}`);
                if (res.ok) {
                    const lista = await res.json();
                    let compatibles = [];
                    // Filtros por tipo
                    if (tipoSugerido === 'gpu' && detalles.gpu) {
                        compatibles = lista.filter(g => g.memoria > (detalles.gpu.memoria || 0));
                    } else if (tipoSugerido === 'procesador' && detalles.mobo && detalles.mobo.socket) {
                        compatibles = lista.filter(p => p.socket === detalles.mobo.socket && p.id !== detalles.procesador?.id);
                    } else if (tipoSugerido === 'ram' && detalles.ram) {
                        compatibles = lista.filter(r => r.frecuencia > (detalles.ram.frecuencia || 0));
                    } else if (tipoSugerido === 'gabinete' && detalles.gabinete) {
                        // Sugerir gabinetes más grandes si la GPU es grande
                        if (detalles.gpu && detalles.gpu.memoria >= 12) {
                            compatibles = lista.filter(g => !g.tamanio.toLowerCase().includes('mini'));
                        } else {
                            compatibles = lista.filter(g => g.id !== detalles.gabinete?.id);
                        }
                    } else if (tipoSugerido === 'mobo' && detalles.procesador && detalles.procesador.socket) {
                        compatibles = lista.filter(m => m.socket === detalles.procesador.socket && m.id !== detalles.mobo?.id);
                    } else if (tipoSugerido === 'fuente' && detalles.gpu && detalles.gpu.memoria) {
                        compatibles = lista.filter(f => f.watts >= 650 && f.id !== detalles.fuente?.id);
                    } else if (tipoSugerido === 'ssd' && detalles.ssd) {
                        compatibles = lista.filter(s => s.capacidad > (detalles.ssd.capacidad || 0));
                    } else if (tipoSugerido === 'hdd' && detalles.hdd) {
                        compatibles = lista.filter(h => h.capacidad > (detalles.hdd.capacidad || 0));
                    }
                    // Si no hay compatibles, muestra todos menos el actual
                    if (compatibles.length === 0) {
                        compatibles = lista.filter(x => x.id !== detalles[tipoSugerido]?.id);
                    }
                    sugerencias = compatibles.slice(0, 3).map(item => ({
                        tipo: tipoSugerido,
                        item
                    }));
                }
            } catch {}
        }

        // Mostrar sugerencias
        let html = '';
        if (sugerencias.length > 0) {
            html += `<div style="margin-top:18px;"><strong>Componentes sugeridos compatibles:</strong><div style="display:flex;gap:18px;margin-top:8px;flex-wrap:wrap;">`;
            sugerencias.forEach(sug => {
                html += `<div class="sugerencia-componente" data-tipo="${sug.tipo}" data-id="${sug.item.id}" style="cursor:pointer;padding:12px 18px;background:#f1f5f9;border-radius:8px;box-shadow:0 2px 8px rgba(30,58,138,0.07);min-width:120px;text-align:center;">
                    <div style="font-weight:600;">${sug.item.nombre}</div>
                    <div style="font-size:13px;color:#64748b;">${sug.tipo.toUpperCase()}</div>
                </div>`;
            });
            html += `</div></div>`;
        }
        sugerenciasDiv.innerHTML = html;

        // Evento click para sugerencias
        sugerenciasDiv.querySelectorAll('.sugerencia-componente').forEach(div => {
            div.addEventListener('click', async function() {
                const tipo = div.getAttribute('data-tipo');
                const id = div.getAttribute('data-id');
                // Selecciona el combo correspondiente y setea el valor
                const comp = componentes.find(c => c.tipo === tipo);
                if (comp) {
                    const combo = document.getElementById(comp.combo);
                    if (combo) {
                        combo.value = id;
                        // Dispara el evento de ver detalles
                        document.querySelector(`.detalle-btn[data-tipo="${tipo}"]`).click();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            });
        });
    } else {
        sugerenciasDiv.innerHTML = '';
    }
});

