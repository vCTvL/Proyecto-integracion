document.getElementById('logout-btn').addEventListener("click",()=>{
    document.cookie='jwt=; Path=/; Expires=Thu,01 Jan 1970 00:00:01 GMT';
    document.location.href ="/"
})

document.getElementById('mostrar-bd-btn').addEventListener('click', async () => {
    const listado = document.getElementById('admin-listado');
    listado.innerHTML = 'Cargando...';
    try {
        const res = await fetch('/api/admin/db');
        if (!res.ok) throw new Error('Error al obtener la base de datos');
        const data = await res.json();
        // Muestra la base de datos como tabla por cada tabla
        let html = '';
        for (const tabla in data) {
            html += `<h4>${tabla}</h4>`;
            if (data[tabla].length === 0) {
                html += '<p>No hay datos.</p>';
                continue;
            }
            html += '<table style="width:100%;margin-bottom:16px;border-collapse:collapse;">';
            html += '<tr>' + Object.keys(data[tabla][0]).map(col => `<th style="border:1px solid #ccc;padding:4px;">${col}</th>`).join('') + '</tr>';
            data[tabla].forEach(row => {
                html += '<tr>' + Object.values(row).map(val => `<td style="border:1px solid #ccc;padding:4px;">${val}</td>`).join('') + '</tr>';
            });
            html += '</table>';
        }
        listado.innerHTML = html;
    } catch (err) {
        listado.innerHTML = `<p class="error">Error al mostrar la base de datos</p>`;
    }
});

// --- MODAL AGREGAR PRODUCTO ---
const btnAgregar = document.getElementById('btn-agregar-producto');
const modal = document.getElementById('modal-agregar-producto');
const cerrarModal = document.getElementById('cerrar-modal-agregar');
const tipoSelect = document.getElementById('tipo-producto-select');
const formAgregar = document.getElementById('form-agregar-producto');
const msgAgregar = document.getElementById('msg-agregar-producto');

btnAgregar.addEventListener('click', () => {
    modal.style.display = 'flex';
    tipoSelect.value = '';
    formAgregar.style.display = 'none';
    formAgregar.innerHTML = '';
    msgAgregar.textContent = '';
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
    tipoSelect.value = '';
    formAgregar.style.display = 'none';
    formAgregar.innerHTML = '';
    msgAgregar.textContent = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        tipoSelect.value = '';
        formAgregar.style.display = 'none';
        formAgregar.innerHTML = '';
        msgAgregar.textContent = '';
    }
});

// Campos por tipo de producto
const camposPorTipo = {
    procesadores: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'nucleos', label: 'Núcleos', type: 'number', required: true },
        { name: 'frecuencia_base', label: 'Frecuencia Base (GHz)', type: 'number', step: '0.1', required: true },
        { name: 'socket', label: 'Socket', type: 'text', required: true }
    ],
    mobo: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'tamanio', label: 'Tamaño', type: 'text', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true },
        { name: 'socket', label: 'Socket', type: 'text', required: true }
    ],
    rams: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'capacidad', label: 'Capacidad (GB)', type: 'number', required: true },
        { name: 'frecuencia', label: 'Frecuencia (MHz)', type: 'number', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ],
    gabinetes: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'tamanio', label: 'Tamaño', type: 'text', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ],
    fuentes: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'watts', label: 'Watts', type: 'number', required: true },
        { name: 'modular', label: 'Modular (Sí/No/Semi)', type: 'text', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ],
    gpus: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'memoria', label: 'Memoria (GB)', type: 'number', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ],
    ssd: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'capacidad', label: 'Capacidad (GB)', type: 'number', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ],
    hdd: [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'marca', label: 'Marca', type: 'text', required: true },
        { name: 'capacidad', label: 'Capacidad (TB)', type: 'number', required: true },
        { name: 'anio_lanzamiento', label: 'Año Lanzamiento', type: 'number', required: true }
    ]
};

// Mostrar inputs según tipo
tipoSelect.addEventListener('change', () => {
    const tipo = tipoSelect.value;
    formAgregar.innerHTML = '';
    msgAgregar.textContent = '';
    if (!tipo || !camposPorTipo[tipo]) {
        formAgregar.style.display = 'none';
        return;
    }
    camposPorTipo[tipo].forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.label;
        label.htmlFor = `input-${campo.name}`;
        const input = document.createElement('input');
        input.type = campo.type;
        input.name = campo.name;
        input.id = `input-${campo.name}`;
        input.required = true;
        input.style.marginBottom = '8px';
        if (campo.step) input.step = campo.step;
        formAgregar.appendChild(label);
        formAgregar.appendChild(input);
    });
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.className = 'agregar-btn';
    btn.textContent = 'Agregar';
    formAgregar.appendChild(btn);
    formAgregar.style.display = 'flex';
});

// Enviar formulario
formAgregar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tipo = tipoSelect.value;
    const datos = {};
    let camposVacios = [];
    Array.from(formAgregar.elements).forEach(el => {
        if (el.name) {
            // Convierte a número si es type number
            if (el.type === 'number') {
                datos[el.name] = el.value !== '' ? Number(el.value) : '';
            } else {
                datos[el.name] = el.value;
            }
            if (el.value === '' || el.value === null || typeof el.value === 'undefined') {
                camposVacios.push(el.name);
            }
        }
    });
    if (camposVacios.length > 0) {
        msgAgregar.textContent = 'Por favor completa todos los campos antes de agregar el producto.';
        msgAgregar.style.color = '#dc2626';
        return;
    }
    try {
        const res = await fetch(`/api/admin/${tipo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        if (!res.ok) throw new Error('Error');
        msgAgregar.textContent = 'Producto agregado correctamente';
        msgAgregar.style.color = '#16a34a';
        formAgregar.reset();
        setTimeout(() => {
            modal.style.display = 'none';
            msgAgregar.textContent = '';
        }, 1000);
    } catch (e) {
        msgAgregar.textContent = 'Error al agregar producto';
        msgAgregar.style.color = '#dc2626';
    }
});

// --- MODAL ELIMINAR PRODUCTO ---
const btnEliminar = document.getElementById('btn-eliminar-producto');
const modalEliminar = document.getElementById('modal-eliminar-producto');
const cerrarModalEliminar = document.getElementById('cerrar-modal-eliminar');
const tipoEliminarSelect = document.getElementById('tipo-eliminar-select');
const productoEliminarSelect = document.getElementById('producto-eliminar-select');
const eliminarProductoBtn = document.getElementById('eliminar-producto-btn');
const msgEliminar = document.getElementById('msg-eliminar-producto');

btnEliminar.addEventListener('click', () => {
    modalEliminar.style.display = 'flex';
    tipoEliminarSelect.value = '';
    productoEliminarSelect.style.display = 'none';
    productoEliminarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    eliminarProductoBtn.style.display = 'none';
    msgEliminar.textContent = '';
});

cerrarModalEliminar.addEventListener('click', () => {
    modalEliminar.style.display = 'none';
    tipoEliminarSelect.value = '';
    productoEliminarSelect.style.display = 'none';
    productoEliminarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    eliminarProductoBtn.style.display = 'none';
    msgEliminar.textContent = '';
});

modalEliminar.addEventListener('click', (e) => {
    if (e.target === modalEliminar) {
        modalEliminar.style.display = 'none';
        tipoEliminarSelect.value = '';
        productoEliminarSelect.style.display = 'none';
        productoEliminarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
        eliminarProductoBtn.style.display = 'none';
        msgEliminar.textContent = '';
    }
});

// Al cambiar el tipo, cargar productos
tipoEliminarSelect.addEventListener('change', async () => {
    const tipo = tipoEliminarSelect.value;
    productoEliminarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    productoEliminarSelect.style.display = 'none';
    eliminarProductoBtn.style.display = 'none';
    msgEliminar.textContent = '';
    if (!tipo) return;
    try {
        const res = await fetch(`/api/admin/${tipo}`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const productos = await res.json();
        if (!Array.isArray(productos) || productos.length === 0) {
            productoEliminarSelect.innerHTML = '<option value="">No hay productos</option>';
            return;
        }
        productos.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nombre || p.id;
            productoEliminarSelect.appendChild(opt);
        });
        productoEliminarSelect.style.display = 'block';
    } catch (e) {
        productoEliminarSelect.innerHTML = '<option value="">Error al cargar</option>';
        productoEliminarSelect.style.display = 'block';
    }
});

// Mostrar botón eliminar solo si hay producto seleccionado
productoEliminarSelect.addEventListener('change', () => {
    eliminarProductoBtn.style.display = productoEliminarSelect.value ? 'block' : 'none';
});

// Eliminar producto
eliminarProductoBtn.addEventListener('click', async () => {
    const tipo = tipoEliminarSelect.value;
    const id = productoEliminarSelect.value;
    if (!tipo || !id) return;
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
        const res = await fetch(`/api/admin/${tipo}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al eliminar');
        msgEliminar.textContent = 'Producto eliminado correctamente';
        msgEliminar.style.color = '#16a34a';
        // Quitar del select
        productoEliminarSelect.querySelector(`option[value="${id}"]`).remove();
        productoEliminarSelect.value = '';
        eliminarProductoBtn.style.display = 'none';
    } catch (e) {
        msgEliminar.textContent = 'Error al eliminar producto';
        msgEliminar.style.color = '#dc2626';
    }
});

// --- MODAL EDITAR PRODUCTO ---
const btnEditar = document.getElementById('btn-editar-producto');
const modalEditar = document.getElementById('modal-editar-producto');
const cerrarModalEditar = document.getElementById('cerrar-modal-editar');
const tipoEditarSelect = document.getElementById('tipo-editar-select');
const productoEditarSelect = document.getElementById('producto-editar-select');
const formEditar = document.getElementById('form-editar-producto');
const editarProductoBtn = document.getElementById('editar-producto-btn');
const msgEditar = document.getElementById('msg-editar-producto');

btnEditar.addEventListener('click', () => {
    modalEditar.style.display = 'flex';
    tipoEditarSelect.value = '';
    productoEditarSelect.style.display = 'none';
    productoEditarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    formEditar.style.display = 'none';
    formEditar.innerHTML = '';
    editarProductoBtn.style.display = 'none';
    msgEditar.textContent = '';
});

cerrarModalEditar.addEventListener('click', () => {
    modalEditar.style.display = 'none';
    tipoEditarSelect.value = '';
    productoEditarSelect.style.display = 'none';
    productoEditarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    formEditar.style.display = 'none';
    formEditar.innerHTML = '';
    editarProductoBtn.style.display = 'none';
    msgEditar.textContent = '';
});

modalEditar.addEventListener('click', (e) => {
    if (e.target === modalEditar) {
        modalEditar.style.display = 'none';
        tipoEditarSelect.value = '';
        productoEditarSelect.style.display = 'none';
        productoEditarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
        formEditar.style.display = 'none';
        formEditar.innerHTML = '';
        editarProductoBtn.style.display = 'none';
        msgEditar.textContent = '';
    }
});

// Al cambiar el tipo, cargar productos
tipoEditarSelect.addEventListener('change', async () => {
    const tipo = tipoEditarSelect.value;
    productoEditarSelect.innerHTML = '<option value="">Selecciona producto...</option>';
    productoEditarSelect.style.display = 'none';
    formEditar.style.display = 'none';
    formEditar.innerHTML = '';
    editarProductoBtn.style.display = 'none';
    msgEditar.textContent = '';
    if (!tipo) return;
    try {
        const res = await fetch(`/api/admin/${tipo}`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const productos = await res.json();
        if (!Array.isArray(productos) || productos.length === 0) {
            productoEditarSelect.innerHTML = '<option value="">No hay productos</option>';
            return;
        }
        productos.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nombre || p.id;
            productoEditarSelect.appendChild(opt);
        });
        productoEditarSelect.style.display = 'block';
    } catch (e) {
        productoEditarSelect.innerHTML = '<option value="">Error al cargar</option>';
        productoEditarSelect.style.display = 'block';
    }
});

// Al seleccionar producto, cargar datos en el formulario
productoEditarSelect.addEventListener('change', async () => {
    const tipo = tipoEditarSelect.value;
    const id = productoEditarSelect.value;
    formEditar.innerHTML = '';
    formEditar.style.display = 'none';
    editarProductoBtn.style.display = 'none';
    msgEditar.textContent = '';
    if (!tipo || !id) return;
    try {
        const res = await fetch(`/api/admin/${tipo}`);
        if (!res.ok) throw new Error('Error al cargar producto');
        const productos = await res.json();
        const producto = productos.find(p => String(p.id) === String(id));
        if (!producto) return;
        // Generar inputs según camposPorTipo
        if (!camposPorTipo[tipo]) return;
        camposPorTipo[tipo].forEach(campo => {
            const label = document.createElement('label');
            label.textContent = campo.label;
            label.htmlFor = `editar-${campo.name}`;
            const input = document.createElement('input');
            input.type = campo.type;
            input.name = campo.name;
            input.id = `editar-${campo.name}`;
            input.required = campo.required;
            input.value = producto[campo.name] ?? '';
            input.style.marginBottom = '8px';
            formEditar.appendChild(label);
            formEditar.appendChild(input);
        });
        // Agregar campo oculto id
        const inputId = document.createElement('input');
        inputId.type = 'hidden';
        inputId.name = 'id';
        inputId.value = producto.id;
        formEditar.appendChild(inputId);

        formEditar.style.display = 'flex';
        editarProductoBtn.style.display = 'block';
    } catch (e) {
        msgEditar.textContent = 'Error al cargar datos del producto';
        msgEditar.style.color = '#dc2626';
    }
});

// Guardar cambios
editarProductoBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const tipo = tipoEditarSelect.value;
    const id = productoEditarSelect.value;
    if (!tipo || !id) return;
    const datos = {};
    Array.from(formEditar.elements).forEach(el => {
        if (el.name) datos[el.name] = el.value;
    });
    try {
        const res = await fetch(`/api/admin/${tipo}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        if (!res.ok) throw new Error('Error');
        msgEditar.textContent = 'Producto editado correctamente';
        msgEditar.style.color = '#16a34a';
        setTimeout(() => {
            modalEditar.style.display = 'none';
            msgEditar.textContent = '';
        }, 1000);
    } catch (e) {
        msgEditar.textContent = 'Error al editar producto';
        msgEditar.style.color = '#dc2626';
    }
});




