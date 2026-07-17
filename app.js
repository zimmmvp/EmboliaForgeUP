let listaItems = [], slotActual = '', itemActual = null, equipoPersonaje = {}, tempStatsBase = [], tempMods = [];
let personajeActual = "Guerrero Zombie";

const DATOS_PERSONAJES = {
    "Guerrero Zombie": { equipo: {} },
    "Mago Oscuro": { equipo: {} },
    "Ninja": { equipo: {} }
};

const coloresRareza = { "Normal": "#ffffff", "Mágico": "#007bff", "Raro": "#28a745", "Épico": "#ff00ff", "Legendario": "#ff8c00" };

function cambiarPersonaje(nombre) {
    DATOS_PERSONAJES[personajeActual].equipo = { ...equipoPersonaje };
    personajeActual = nombre;
    equipoPersonaje = { ...DATOS_PERSONAJES[personajeActual].equipo };
    limpiarSlots();
    cargarEquipoEnSlots();
    actualizarEstadisticasGlobales();
}

function limpiarSlots() {
    document.querySelectorAll('.slot').forEach(slot => {
        slot.style.borderColor = "#333";
        slot.style.backgroundColor = "#1a1a1e";
        slot.style.backgroundImage = "none";
        slot.innerHTML = slot.id.replace('slot-', '').toUpperCase();
    });
}

function cargarEquipoEnSlots() {
    for (const slot in equipoPersonaje) {
        dibujarSlot(slot, equipoPersonaje[slot]);
    }
}

function dibujarSlot(slot, info) {
    const el = document.getElementById('slot-' + slot);
    if(!el) return;
    const nombreArchivo = typeof MAPEO_IMAGENES !== 'undefined' ? MAPEO_IMAGENES[info.itemOriginal.id] : null;
    el.style.backgroundColor = coloresRareza[info.rareza];
    el.style.borderColor = "#fff";
    el.innerHTML = `<div style="height:100%; position:relative;"><div style="position:absolute; bottom:2px; left:4px; background:black; color:white; padding:0 4px; border-radius:3px; font-size:11px; font-weight:bold;">${info.nivel}</div></div>`;
    if (nombreArchivo) {
        el.style.backgroundImage = `url('img/${nombreArchivo}')`;
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";
    }
}

async function cargarDatos() {
    try {
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        listaItems = texto.split('\n').filter(l => l.includes('item_name_')).map(l => ({ id: l.split('=>')[0].split('item_name_')[1].trim(), nombre: l.split('=>')[1].trim() }));
    } catch (e) { console.error("Error al cargar datos"); }
}

function filtrarModal(busqueda) {
    const cont = document.getElementById('lista-modal');
    cont.innerHTML = '';
    listaItems.filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase())).forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card'; div.innerText = item.nombre;
        div.onclick = () => activarEdicion(item);
        cont.appendChild(div);
    });
}

function abrirModalParaSeleccion(slot) {
    slotActual = slot;
    document.getElementById('modal-planner').style.display = "block";
    if (equipoPersonaje[slotActual]) {
        activarEdicion(equipoPersonaje[slotActual].itemOriginal);
    } else {
        document.getElementById('pantalla-seleccion').style.display = "block";
        document.getElementById('seccion-edicion').style.display = "none";
        filtrarPorSlot(slot);
    }
}

function filtrarPorSlot(slot) {
    const cont = document.getElementById('lista-modal');
    cont.innerHTML = '';
    const tunicasPermitidas = ["túnica de sombras", "túnica ciruja", "túnica de majul"];
    listaItems.filter(i => {
        const nombre = i.nombre.toLowerCase();
        if (slot === 'armadura') return nombre.includes('armadura') || tunicasPermitidas.some(t => nombre.includes(t));
        return nombre.includes(slot.toLowerCase());
    }).forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card'; div.innerText = item.nombre;
        div.onclick = () => activarEdicion(item);
        cont.appendChild(div);
    });
}

function guardarYEquipar() {
    equipoPersonaje[slotActual] = { itemOriginal: itemActual, nombre: itemActual.nombre, nivel: document.getElementById('select-nivel').value, rareza: document.getElementById('select-rareza').value, grado: document.getElementById('select-grado').value, poder: document.getElementById('input-poder').value, statsBase: [...tempStatsBase], modificadores: [...tempMods] };
    dibujarSlot(slotActual, equipoPersonaje[slotActual]);
    actualizarEstadisticasGlobales();
    cerrarModal();
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

// Carga inicial
cargarDatos();
