let listaItems = [];
let tipoSeleccionado = 'todo';

async function cargarDatos() { try { const res = await fetch('data/item.txt'); const texto = await res.text(); texto.split('\n').forEach(linea => { if (linea.includes('item_name_')) { const [llave, valor] = linea.split('=>'); listaItems.push({ id: llave.split('item_name_')[1].trim(), nombre: valor.trim() }); } }); } catch (e) { console.error("Error"); } }

function abrirModalParaSeleccion(tipo) { document.getElementById('modal-planner').style.display = "block"; document.getElementById('seccion-edicion').style.display = "none"; document.getElementById('pantalla-seleccion').style.display = "block"; const contenedor = document.getElementById('lista-modal'); contenedor.innerHTML = ''; listaItems.forEach(item => { const div = document.createElement('div'); div.className = 'item-card'; div.innerText = item.nombre; div.onclick = () => activarEdicion(item); contenedor.appendChild(div); }); }

function filtrarPorTipo(tipo) { tipoSeleccionado = tipo; filtrarModal(document.getElementById('busqueda-modal').value); }

function filtrarModal(texto) { const busqueda = texto.toLowerCase(); const items = document.getElementsByClassName('item-card'); for (let item of items) { const nombre = item.innerText.toLowerCase(); const coincideNombre = nombre.includes(busqueda); const coincideTipo = (tipoSeleccionado === 'todo' || nombre.includes(tipoSeleccionado)); item.style.display = (coincideNombre && coincideTipo) ? "" : "none"; } }

function activarEdicion(item) { document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre; document.getElementById('pantalla-seleccion').style.display = "none"; document.getElementById('seccion-edicion').style.display = "block"; }
function actualizarInfo() { const rarezaSelect = document.getElementById('select-rareza'); document.getElementById('item-preview-img').style.borderColor = rarezaSelect.options[rarezaSelect.selectedIndex].getAttribute('data-color'); }
function agregarStatBase() { const tipo = document.getElementById('new-stat-tipo').value; const valor = document.getElementById('new-stat-valor').value; if(valor) { const div = document.createElement('div'); div.className = 'stat-item'; div.innerText = tipo + ": " + valor; document.getElementById('lista-stats-base').appendChild(div); document.getElementById('new-stat-valor').value = ''; } }
function agregarModSeleccionado() { const mod = document.getElementById('select-mods').value; const valor = document.getElementById('input-valor-mod').value; if(mod && valor) { const div = document.createElement('div'); div.className = 'stat-item'; div.innerText = mod + ": " + valor; document.getElementById('lista-mods-agregados').appendChild(div); document.getElementById('input-valor-mod').value = ''; } }
function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }
cargarDatos();
