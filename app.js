let listaItems = [];
let tipoSeleccionado = 'todo';

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
    selects.forEach(select => {
        LISTA_STATS.forEach(stat => {
            const option = document.createElement('option');
            option.value = stat; option.text = stat;
            select.appendChild(option);
        });
    });

    const niveles = ["+0", "+1", "+2", "+3", "+4", "+5"];
    const rarezas = ["Normal", "Mágico", "Raro", "Épico", "Legendario"];
    const grados = ["D", "C", "B", "A", "S"];

    niveles.forEach(n => document.getElementById('select-nivel').innerHTML += `<option>${n}</option>`);
    rarezas.forEach(r => document.getElementById('select-rareza').innerHTML += `<option>${r}</option>`);
    grados.forEach(g => document.getElementById('select-grado').innerHTML += `<option>${g}</option>`);
}

function agregarStatBase() {
    const tipo = document.getElementById('new-stat-tipo').value;
    const valor = document.getElementById('new-stat-valor').value;
    if(valor) {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerText = tipo + ": " + valor;
        document.getElementById('lista-stats-base').appendChild(div);
        document.getElementById('new-stat-valor').value = '';
    }
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(valor) {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerText = mod + ": " + valor;
        document.getElementById('lista-mods-agregados').appendChild(div);
        document.getElementById('input-valor-mod').value = '';
    }
}

async function cargarDatos() { try { const res = await fetch('data/item.txt'); const texto = await res.text(); texto.split('\n').forEach(linea => { if (linea.includes('item_name_')) { const [llave, valor] = linea.split('=>'); listaItems.push({ id: llave.split('item_name_')[1].trim(), nombre: valor.trim() }); } }); } catch (e) { console.error("Error"); } }

function abrirModalParaSeleccion(tipo) { document.getElementById('modal-planner').style.display = "block"; document.getElementById('seccion-edicion').style.display = "none"; document.getElementById('pantalla-seleccion').style.display = "block"; const contenedor = document.getElementById('lista-modal'); contenedor.innerHTML = ''; listaItems.forEach(item => { const div = document.createElement('div'); div.className = 'item-card'; div.innerText = item.nombre; div.onclick = () => activarEdicion(item); contenedor.appendChild(div); }); }

function activarEdicion(item) { document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre; document.getElementById('pantalla-seleccion').style.display = "none"; document.getElementById('seccion-edicion').style.display = "block"; }
function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

cargarDatos();
cargarEstadisticas();
inicializarSelectores();
