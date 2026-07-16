let listaItems = [];
let slotActual = "";
let equipoPersonaje = {};

function cargarEstadisticas() {
    const contenedor = document.getElementById('lista-estadisticas');
    LISTA_STATS.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-linea';
        div.innerHTML = `<span>${stat}:</span> <span id="stat-${stat.replace(/ /g, '-')}">0</span>`;
        contenedor.appendChild(div);
    });
}

function inicializarSelectores() {
    const selects = [document.getElementById('new-stat-tipo'), document.getElementById('select-mods')];
    selects.forEach(s => LISTA_STATS.forEach(stat => s.innerHTML += `<option>${stat}</option>`));
    ["+0", "+1", "+2", "+3", "+4", "+5"].forEach(n => document.getElementById('select-nivel').innerHTML += `<option>${n}</option>`);
    ["Normal", "Mágico", "Raro", "Épico", "Legendario"].forEach(r => document.getElementById('select-rareza').innerHTML += `<option>${r}</option>`);
    ["D", "C", "B", "A", "S"].forEach(g => document.getElementById('select-grado').innerHTML += `<option>${g}</option>`);
}

function actualizarVisual() {
    const rareza = document.getElementById('select-rareza').value;
    const box = document.getElementById('item-preview-box');
    const tag = document.getElementById('item-nivel-tag');
    const colores = { "Normal": "#ffffff", "Mágico": "#007bff", "Raro": "#28a745", "Épico": "#ff00ff", "Legendario": "#ff8c00" };
    box.style.backgroundColor = colores[rareza] || "#ffffff";
    tag.innerText = document.getElementById('select-nivel').value;
}

function agregarStatBase() {
    const tipo = document.getElementById('new-stat-tipo').value;
    const valor = document.getElementById('new-stat-valor').value;
    if(valor) {
        const div = document.createElement('div');
        div.className = 'stat-chip';
        div.innerHTML = `${tipo}: ${valor} <button onclick="this.parentElement.remove()">x</button>`;
        document.getElementById('lista-stats-base').appendChild(div);
    }
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(valor) {
        const div = document.createElement('div');
        div.className = 'stat-chip';
        div.innerHTML = `${mod}: ${valor} <button onclick="this.parentElement.remove()">x</button>`;
        document.getElementById('lista-mods-agregados').appendChild(div);
    }
}

async function cargarDatos() {
    try {
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        listaItems = [];
        texto.split('\n').forEach(linea => {
            if (linea.includes('=>')) {
                const [llave, valor] = linea.split('=>');
                listaItems.push({ id: llave.trim(), nombre: valor.trim() });
            }
        });
    } catch (e) { console.error("Error al cargar ítems:", e); }
}

function abrirModalParaSeleccion(tipo, slotId) {
    slotActual = slotId;
    document.getElementById('modal-planner').style.display = "block";
    document.getElementById('pantalla-seleccion').style.display = "block";
    document.getElementById('seccion-edicion').style.display = "none";
    const contenedor = document.getElementById('lista-modal');
    contenedor.innerHTML = '';
    listaItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerText = item.nombre;
        div.onclick = () => activarEdicion(item);
        contenedor.appendChild(div);
    });
}

function activarEdicion(item) {
    document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre;
    document.getElementById('pantalla-seleccion').style.display = "none";
    document.getElementById('seccion-edicion').style.display = "block";
    document.getElementById('lista-stats-base').innerHTML = '';
    document.getElementById('lista-mods-agregados').innerHTML = '';
    actualizarVisual();
}

function guardarYEquipar() {
    equipoPersonaje[slotActual] = { nombre: document.getElementById('modal-titulo').innerText };
    cerrarModal();
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

cargarDatos();
cargarEstadisticas();
inicializarSelectores();
