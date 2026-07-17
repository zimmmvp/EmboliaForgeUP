let listaItems = [], slotActual = '', itemActual = null, equipoPersonaje = {}, tempStatsBase = [], tempMods = [];
let personajeActual = "Guerrero Zombie";
const DATOS_PERSONAJES = { "Guerrero Zombie": { equipo: {} }, "Mago Oscuro": { equipo: {} }, "Ninja": { equipo: {} } };
const coloresRareza = { "Normal": "#ffffff", "Mágico": "#007bff", "Raro": "#28a745", "Épico": "#ff00ff", "Legendario": "#ff8c00" };

function activarEdicion(item) {
    itemActual = item;
    document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre;
    document.getElementById('pantalla-seleccion').style.display = "none";
    document.getElementById('seccion-edicion').style.display = "block";
    const guardado = equipoPersonaje[slotActual] || { nivel: "+0", rareza: "Normal", statsBase: [], modificadores: [] };
    document.getElementById('select-nivel').value = guardado.nivel;
    document.getElementById('select-rareza').value = guardado.rareza;
    renderizarStats('lista-stats-base', guardado.statsBase || [], 'eliminarStatBase');
    renderizarStats('lista-mods-agregados', guardado.modificadores || [], 'eliminarMod');
}

function renderizarStats(containerId, lista, funcName) {
    const cont = document.getElementById(containerId);
    cont.innerHTML = '';
    lista.forEach((item, idx) => cont.innerHTML += `<div class="stat-item">${item.tipo}: ${item.valor}</div>`);
}

function cambiarPersonaje(nombre) {
    DATOS_PERSONAJES[personajeActual].equipo = { ...equipoPersonaje };
    personajeActual = nombre;
    equipoPersonaje = { ...DATOS_PERSONAJES[personajeActual].equipo };
    limpiarSlots();
    cargarEquipoEnSlots();
}

function limpiarSlots() {
    document.querySelectorAll('.slot').forEach(s => { s.style.backgroundColor = "#1a1a1e"; s.innerHTML = s.id.replace('slot-', '').toUpperCase(); });
}

function cargarEquipoEnSlots() {
    for (const slot in equipoPersonaje) { dibujarSlot(slot, equipoPersonaje[slot]); }
}

function dibujarSlot(slot, info) {
    const el = document.getElementById('slot-' + slot);
    if (el) { el.style.backgroundColor = coloresRareza[info.rareza]; el.innerHTML = info.nivel; }
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
    if (equipoPersonaje[slotActual]) activarEdicion(equipoPersonaje[slotActual].itemOriginal);
    else { document.getElementById('pantalla-seleccion').style.display = "block"; document.getElementById('seccion-edicion').style.display = "none"; }
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

cargarDatos();
