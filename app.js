let listaItems = [];
let tipoSeleccionado = 'todo';
let slotActual = ''; // Almacena el slot que se está editando
let itemActual = null; // Almacena el objeto del ítem seleccionado en edición

// Estado persistente para el equipamiento del personaje
let equipoPersonaje = {
    casco: null,
    armadura: null,
    guantes: null,
    arma: null,
    pico: null,
    collar: null,
    anillo: null,
    botas: null,
    'arma-der': null,
    alas: null
};

// Listas temporales de edición para evitar mezclar stats entre ítems
let tempStatsBase = [];
let tempMods = [];

const coloresRareza = { 
    "Normal": "#ffffff", 
    "Mágico": "#007bff", 
    "Raro": "#28a745", 
    "Épico": "#ff00ff", 
    "Legendario": "#ff8c00" 
};

function cargarEstadisticas() {
    const contenedor = document.getElementById('lista-estadisticas');
    contenedor.innerHTML = '<h2>Estadísticas</h2>'; // Limpia para no duplicar
    LISTA_STATS.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-linea';
        div.innerHTML = `<span>${stat}:</span> <span id="stat-${stat.replace(/ /g, '-')}">0</span>`;
        contenedor.appendChild(div);
    });
}

function inicializarSelectores() {
    const selects = [document.getElementById('new-stat-tipo'), document.getElementById('select-mods')];
    selects.forEach(select => {
        select.innerHTML = ''; // Limpiar opciones previas
        LISTA_STATS.forEach(stat => {
            const option = document.createElement('option');
            option.value = stat; option.text = stat;
            select.appendChild(option);
        });
    });
    
    const selectNivel = document.getElementById('select-nivel');
    const selectRareza = document.getElementById('select-rareza');
    const selectGrado = document.getElementById('select-grado');
    
    selectNivel.innerHTML = '';
    selectRareza.innerHTML = '';
    selectGrado.innerHTML = '';

    const niveles = ["+0", "+1", "+2", "+3", "+4", "+5"];
    const rarezas = ["Normal", "Mágico", "Raro", "Épico", "Legendario"];
    const grados = ["D", "C", "B", "A", "S"];
    
    niveles.forEach(n => selectNivel.innerHTML += `<option value="${n}">${n}</option>`);
    rarezas.forEach(r => selectRareza.innerHTML += `<option value="${r}">${r}</option>`);
    grados.forEach(g => selectGrado.innerHTML += `<option value="${g}">${g}</option>`);
}

function actualizarVisual() {
    const rareza = document.getElementById('select-rareza').value;
    const nivel = document.getElementById('select-nivel').value;
    const box = document.getElementById('item-preview-box');
    const tag = document.getElementById('item-nivel-tag');
    
    box.style.backgroundColor = coloresRareza[rareza] || "#ffffff";
    tag.innerText = nivel;
}

function renderizarStatsBase() {
    const contenedor = document.getElementById('lista-stats-base');
    contenedor.innerHTML = '';
    tempStatsBase.forEach((stat, index) => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <span>${stat.tipo}: <strong>${stat.valor}</strong></span>
            <button class="btn-eliminar-stat" onclick="eliminarStatBase(${index})">×</button>
        `;
        contenedor.appendChild(div);
    });
}

function renderizarMods() {
    const contenedor = document.getElementById('lista-mods-agregados');
    contenedor.innerHTML = '';
    tempMods.forEach((mod, index) => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <span>${mod.tipo}: <strong>${mod.valor}</strong></span>
            <button class="btn-eliminar-stat" onclick="eliminarMod(${index})">×</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarStatBase() {
    const tipo = document.getElementById('new-stat-tipo').value;
    const valor = document.getElementById('new-stat-valor').value;
    if(valor) {
        tempStatsBase.push({ tipo, valor });
        renderizarStatsBase();
        document.getElementById('new-stat-valor').value = '';
    }
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(valor) {
        tempMods.push({ tipo: mod, valor });
        renderizarMods();
        document.getElementById('input-valor-mod').value = '';
    }
}

function eliminarStatBase(index) {
    tempStatsBase.splice(index, 1);
    renderizarStatsBase();
}

function eliminarMod(index) {
    tempMods.splice(index, 1);
    renderizarMods();
}

async function cargarDatos() { 
    try { 
        const res = await fetch('data/item.txt'); 
        const texto = await res.text(); 
        listaItems = [];
        texto.split('\n').forEach(linea => { 
            if (linea.includes('item_name_')) { 
                const [llave, valor] = linea.split('=>'); 
                listaItems.push({ id: llave.split('item_name_')[1].trim(), nombre: valor.trim() }); 
            } 
        }); 
    } catch (e) { 
        console.error("Error al cargar item.txt:", e); 
    } 
}

function abrirModalParaSeleccion(slot) { 
    slotActual = slot;
    document.getElementById('modal-planner').style.display = "block"; 
    
    // Si ya hay un item equipado en este slot, cargamos su edición directamente
    if (equipoPersonaje[slotActual]) {
        activarEdicion(equipoPersonaje[slotActual].itemOriginal);
    } else {
        regresarASeleccion();
    }
}

function filtrarModal(busqueda) {
    const contenedor = document.getElementById('lista-modal');
    contenedor.innerHTML = '';
    
    const filtrados = listaItems.filter(item => {
        const coincideNombre = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
        if (tipoSeleccionado === 'todo') return coincideNombre;
        return coincideNombre && item.id.toLowerCase().includes(tipoSeleccionado);
    });

    filtrados.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerText = item.nombre;
        div.onclick = () => activarEdicion(item);
        contenedor.appendChild(div);
    });
}

function filtrarPorTipo(tipo) {
    tipoSeleccionado = tipo;
    const busqueda = document.getElementById('busqueda-modal').value;
    filtrarModal(busqueda);
}

function regresarASeleccion() {
    document.getElementById('seccion-edicion').style.display = "none"; 
    document.getElementById('pantalla-seleccion').style.display = "block"; 
    document.getElementById('modal-titulo').innerText = "Editar Ítem";
    document.getElementById('busqueda-modal').value = '';
    filtrarModal('');
}

function activarEdicion(item) { 
    itemActual = item;
    document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre; 
    document.getElementById('pantalla-seleccion').style.display = "none"; 
    document.getElementById('seccion-edicion').style.display = "block"; 
    
    // Si ya teníamos información guardada exactamente de este item en el slot actual, la cargamos
    const guardado = equipoPersonaje[slotActual];
    if (guardado && guardado.nombre === item.nombre) {
        document.getElementById('select-nivel').value = guardado.nivel;
        document.getElementById('select-rareza').value = guardado.rareza;
        document.getElementById('select-grado').value = guardado.grado;
        document.getElementById('input-poder').value = guardado.poder;
        tempStatsBase = [...guardado.statsBase];
        tempMods = [...guardado.modificadores];
    } else {
        // Si es un item nuevo o no estaba guardado en este slot, reseteamos los campos
        document.getElementById('select-nivel').value = "+0";
        document.getElementById('select-rareza').value = "Normal";
        document.getElementById('select-grado').value = "D";
        document.getElementById('input-poder').value = "";
        tempStatsBase = [];
        tempMods = [];
    }

    actualizarVisual(); 
    renderizarStatsBase();
    renderizarMods();
}

function guardarYEquipar() {
    if (!itemActual) {
        cerrarModal();
        return;
    }

    // 1. Guardar la configuración en el slot activo
    equipoPersonaje[slotActual] = {
        itemOriginal: itemActual,
        nombre: itemActual.nombre,
        nivel: document.getElementById('select-nivel').value,
        rareza: document.getElementById('select-rareza').value,
        grado: document.getElementById('select-grado').value,
        poder: document.getElementById('input-poder').value,
        statsBase: [...tempStatsBase],
        modificadores: [...tempMods]
    };

    // 2. Actualizar visualmente el slot de la pantalla principal
    actualizarSlotVisual(slotActual);

    // 3. Recalcular estadísticas globales en el panel derecho
    actualizarEstadisticasGlobales();

    cerrarModal();
}

function actualizarSlotVisual(slot) {
    const el = document.getElementById('slot-' + slot);
    if (!el) return;

    const info = equipoPersonaje[slot];
    if (info) {
        const color = coloresRareza[info.rareza] || "#ffffff";
        el.style.borderColor = color;
        el.style.boxShadow = `0 0 8px ${color}`;
        el.style.color = "#ffffff";
        el.innerHTML = `
            <div style="font-size: 9px; line-height: 1.1; font-weight: bold; text-shadow: 0px 1px 2px black; padding: 2px;">
                ${info.nombre}<br>
                <span style="color: ${color}; font-weight: bold;">${info.nivel}</span>
            </div>
        `;
    }
}

function actualizarEstadisticasGlobales() {
    let totales = {};
    LISTA_STATS.forEach(stat => {
        totales[stat] = 0;
    });

    // Sumar todos los items equipados actualmente
    for (const slot in equipoPersonaje) {
        const item = equipoPersonaje[slot];
        if (item) {
            item.statsBase.forEach(s => {
                if (totales[s.tipo] !== undefined) {
                    totales[s.tipo] += parseFloat(s.valor) || 0;
                }
            });
            item.modificadores.forEach(m => {
                if (totales[m.tipo] !== undefined) {
                    totales[m.tipo] += parseFloat(m.valor) || 0;
                }
            });
        }
    }

    // Dibujar totales actualizados en el panel
    LISTA_STATS.forEach(stat => {
        const elId = `stat-${stat.replace(/ /g, '-')}`;
        const el = document.getElementById(elId);
        if (el) {
            el.innerText = totales[stat];
        }
    });
}

function cerrarModal() { 
    document.getElementById('modal-planner').style.display = "none"; 
}

// Inicialización de la App
cargarDatos();
cargarEstadisticas();
inicializarSelectores();
