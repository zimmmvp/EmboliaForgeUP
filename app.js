let listaItems = [];
let slotActual = ''; 
let itemActual = null; 

let equipoPersonaje = {
    casco: null, armadura: null, guantes: null, arma: null, pico: null,
    collar: null, anillo: null, botas: null, 'arma-der': null, alas: null
};

let tempStatsBase = [];
let tempMods = [];

const coloresRareza = { 
    "Normal": "#ffffff", "Mágico": "#007bff", "Raro": "#28a745", 
    "Épico": "#ff00ff", "Legendario": "#ff8c00" 
};

function cargarEstadisticas() {
    const contenedor = document.getElementById('lista-estadisticas');
    // Se elimina la inyección del h2 aquí para evitar el título duplicado[cite: 3]
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
        select.innerHTML = '';
        LISTA_STATS.forEach(stat => {
            const option = document.createElement('option');
            option.value = stat; option.text = stat;
            select.appendChild(option);
        });
    });
    
    const niveles = ["+0", "+1", "+2", "+3", "+4", "+5"];
    const rarezas = ["Normal", "Mágico", "Raro", "Épico", "Legendario"];
    const grados = ["D", "C", "B", "A", "S"];
    
    niveles.forEach(n => document.getElementById('select-nivel').innerHTML += `<option value="${n}">${n}</option>`);
    rarezas.forEach(r => document.getElementById('select-rareza').innerHTML += `<option value="${r}">${r}</option>`);
    grados.forEach(g => document.getElementById('select-grado').innerHTML += `<option value="${g}">${g}</option>`);
}

function actualizarVisual() {
    const rareza = document.getElementById('select-rareza').value;
    const nivel = document.getElementById('select-nivel').value;
    const box = document.getElementById('item-preview-box');
    const tag = document.getElementById('item-nivel-tag');
    box.style.backgroundColor = coloresRareza[rareza] || "#ffffff";
    tag.innerText = nivel;
}

function renderizarStats(tipo, contenedorId, lista, funcionEliminar) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = '';
    lista.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `<span>${item.tipo}: <strong>${item.valor}</strong></span>
                         <button class="btn-eliminar-stat" onclick="${funcionEliminar}(${index})">×</button>`;
        contenedor.appendChild(div);
    });
}

function agregarStatBase() {
    const tipo = document.getElementById('new-stat-tipo').value;
    const valor = document.getElementById('new-stat-valor').value;
    if(valor) { tempStatsBase.push({ tipo, valor }); renderizarStats('base', 'lista-stats-base', tempStatsBase, 'eliminarStatBase'); document.getElementById('new-stat-valor').value = ''; }
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(valor) { tempMods.push({ tipo: mod, valor }); renderizarStats('mod', 'lista-mods-agregados', tempMods, 'eliminarMod'); document.getElementById('input-valor-mod').value = ''; }
}

function eliminarStatBase(index) { tempStatsBase.splice(index, 1); renderizarStats('base', 'lista-stats-base', tempStatsBase, 'eliminarStatBase'); }
function eliminarMod(index) { tempMods.splice(index, 1); renderizarStats('mod', 'lista-mods-agregados', tempMods, 'eliminarMod'); }

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
    } catch (e) { console.error("Error al cargar item.txt:", e); } 
}

function abrirModalParaSeleccion(slot) { 
    slotActual = slot;
    document.getElementById('modal-planner').style.display = "block"; 
    if (equipoPersonaje[slotActual]) { activarEdicion(equipoPersonaje[slotActual].itemOriginal); } 
    else { document.getElementById('pantalla-seleccion').style.display = "block"; document.getElementById('seccion-edicion').style.display = "none"; }
}

function filtrarModal(busqueda) {
    const contenedor = document.getElementById('lista-modal');
    contenedor.innerHTML = '';
    listaItems.filter(i => i.nombre.toLowerCase().includes(busqueda.toLowerCase())).forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerText = item.nombre;
        div.onclick = () => activarEdicion(item);
        contenedor.appendChild(div);
    });
}

function activarEdicion(item) { 
    itemActual = item;
    document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre; 
    document.getElementById('pantalla-seleccion').style.display = "none"; 
    document.getElementById('seccion-edicion').style.display = "block"; 
    
    const guardado = equipoPersonaje[slotActual];
    if (guardado && guardado.nombre === item.nombre) {
        document.getElementById('select-nivel').value = guardado.nivel;
        document.getElementById('select-rareza').value = guardado.rareza;
        document.getElementById('select-grado').value = guardado.grado;
        document.getElementById('input-poder').value = guardado.poder;
        tempStatsBase = [...guardado.statsBase];
        tempMods = [...guardado.modificadores];
    } else {
        tempStatsBase = []; tempMods = [];
    }
    actualizarVisual(); renderizarStats('base', 'lista-stats-base', tempStatsBase, 'eliminarStatBase'); renderizarStats('mod', 'lista-mods-agregados', tempMods, 'eliminarMod');
}

function guardarYEquipar() {
    equipoPersonaje[slotActual] = {
        itemOriginal: itemActual, nombre: itemActual.nombre, nivel: document.getElementById('select-nivel').value,
        rareza: document.getElementById('select-rareza').value, grado: document.getElementById('select-grado').value,
        poder: document.getElementById('input-poder').value, statsBase: [...tempStatsBase], modificadores: [...tempMods]
    };
    const el = document.getElementById('slot-' + slotActual);
    const info = equipoPersonaje[slotActual];
    el.style.borderColor = coloresRareza[info.rareza];
    el.innerHTML = `<div style="font-size: 9px; font-weight: bold;">${info.nombre}<br><span style="color: ${coloresRareza[info.rareza]}">${info.nivel}</span></div>`;
    cerrarModal();
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

cargarDatos();
cargarEstadisticas();
inicializarSelectores();
