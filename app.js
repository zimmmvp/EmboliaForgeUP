let listaItems = [], slotActual = '', itemActual = null, equipoPersonaje = {}, tempStatsBase = [], tempMods = [];
const coloresRareza = { "Normal": "#ffffff", "Mágico": "#007bff", "Raro": "#28a745", "Épico": "#ff00ff", "Legendario": "#ff8c00" };

function cargarEstadisticas() {
    const contenedor = document.getElementById('lista-estadisticas');
    LISTA_STATS.forEach(stat => {
        contenedor.innerHTML += `<div class="stat-linea"><span>${stat}:</span> <span id="stat-${stat.replace(/ /g, '-')}">0</span></div>`;
    });
}

function inicializarSelectores() {
    const selects = [document.getElementById('new-stat-tipo'), document.getElementById('select-mods')];
    selects.forEach(s => LISTA_STATS.forEach(stat => s.innerHTML += `<option value="${stat}">${stat}</option>`));
    ["+0", "+1", "+2", "+3", "+4", "+5"].forEach(n => document.getElementById('select-nivel').innerHTML += `<option value="${n}">${n}</option>`);
    ["Normal", "Mágico", "Raro", "Épico", "Legendario"].forEach(r => document.getElementById('select-rareza').innerHTML += `<option value="${r}">${r}</option>`);
    ["D", "C", "B", "A", "S"].forEach(g => document.getElementById('select-grado').innerHTML += `<option value="${g}">${g}</option>`);
}

function actualizarVisual() {
    const rareza = document.getElementById('select-rareza').value;
    document.getElementById('item-preview-box').style.backgroundColor = coloresRareza[rareza];
    document.getElementById('item-nivel-tag').innerText = document.getElementById('select-nivel').value;
}

function renderizarStats(containerId, lista, funcName) {
    const cont = document.getElementById(containerId);
    cont.innerHTML = '';
    lista.forEach((item, idx) => cont.innerHTML += `<div class="stat-item">${item.tipo}: <strong>${item.valor}</strong><button class="btn-eliminar-stat" onclick="${funcName}(${idx})">×</button></div>`);
}

async function cargarDatos() {
    try {
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        listaItems = texto.split('\n').filter(l => l.includes('item_name_')).map(l => ({ id: l.split('=>')[0].split('item_name_')[1].trim(), nombre: l.split('=>')[1].trim() }));
        filtrarModal('');
    } catch (e) { console.error("Error al cargar datos"); }
}

function abrirModalParaSeleccion(slot) {
    slotActual = slot;
    document.getElementById('modal-planner').style.display = "block";
    if (equipoPersonaje[slotActual]) activarEdicion(equipoPersonaje[slotActual].itemOriginal);
    else { document.getElementById('pantalla-seleccion').style.display = "block"; document.getElementById('seccion-edicion').style.display = "none"; }
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

function activarEdicion(item) {
    itemActual = item;
    document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre;
    document.getElementById('pantalla-seleccion').style.display = "none";
    document.getElementById('seccion-edicion').style.display = "block";
    const guardado = equipoPersonaje[slotActual] || { nivel: "+0", rareza: "Normal", grado: "D", poder: "", statsBase: [], modificadores: [] };
    document.getElementById('select-nivel').value = guardado.nivel;
    document.getElementById('select-rareza').value = guardado.rareza;
    document.getElementById('select-grado').value = guardado.grado;
    document.getElementById('input-poder').value = guardado.poder;
    tempStatsBase = [...guardado.statsBase]; tempMods = [...guardado.modificadores];
    actualizarVisual(); renderizarStats('lista-stats-base', tempStatsBase, 'eliminarStatBase'); renderizarStats('lista-mods-agregados', tempMods, 'eliminarMod');
}

function resetearItemActual() {
    document.getElementById('select-nivel').value = "+0"; document.getElementById('select-rareza').value = "Normal"; document.getElementById('select-grado').value = "D"; document.getElementById('input-poder').value = "";
    tempStatsBase = []; tempMods = [];
    renderizarStats('lista-stats-base', tempStatsBase, 'eliminarStatBase'); renderizarStats('lista-mods-agregados', tempMods, 'eliminarMod');
    actualizarVisual();
}

function guardarYEquipar() {
    equipoPersonaje[slotActual] = { itemOriginal: itemActual, nombre: itemActual.nombre, nivel: document.getElementById('select-nivel').value, rareza: document.getElementById('select-rareza').value, grado: document.getElementById('select-grado').value, poder: document.getElementById('input-poder').value, statsBase: [...tempStatsBase], modificadores: [...tempMods] };
    const el = document.getElementById('slot-' + slotActual);
    const info = equipoPersonaje[slotActual];
    el.style.borderColor = coloresRareza[info.rareza];
    el.innerHTML = `<div style="height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:4px;"><div style="font-size:9px; font-weight:bold;">${info.nombre}</div><div style="text-align:right; font-size:10px; font-weight:bold; color:${coloresRareza[info.rareza]}">${info.nivel}</div></div>`;
    actualizarEstadisticasGlobales(); cerrarModal();
}

function actualizarEstadisticasGlobales() {
    let totales = {}; LISTA_STATS.forEach(s => totales[s] = 0);
    for (const s in equipoPersonaje) {
        if (equipoPersonaje[s]) {
            [...equipoPersonaje[s].statsBase, ...equipoPersonaje[s].modificadores].forEach(item => {
                if (totales[item.tipo] !== undefined) totales[item.tipo] += parseFloat(item.valor) || 0;
            });
        }
    }
    LISTA_STATS.forEach(s => { const el = document.getElementById(`stat-${s.replace(/ /g, '-')}`); if (el) el.innerText = totales[s]; });
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }
function agregarStatBase() { tempStatsBase.push({ tipo: document.getElementById('new-stat-tipo').value, valor: document.getElementById('new-stat-valor').value }); renderizarStats('lista-stats-base', tempStatsBase, 'eliminarStatBase'); }
function agregarModSeleccionado() { tempMods.push({ tipo: document.getElementById('select-mods').value, valor: document.getElementById('input-valor-mod').value }); renderizarStats('lista-mods-agregados', tempMods, 'eliminarMod'); }
function eliminarStatBase(i) { tempStatsBase.splice(i, 1); renderizarStats('lista-stats-base', tempStatsBase, 'eliminarStatBase'); }
function eliminarMod(i) { tempMods.splice(i, 1); renderizarStats('lista-mods-agregados', tempMods, 'eliminarMod'); }

cargarDatos(); cargarEstadisticas(); inicializarSelectores();
