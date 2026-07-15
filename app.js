let listaItems = [];

async function cargarDatos() {
    try {
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        texto.split('\n').forEach(linea => {
            if (linea.includes('item_name_')) {
                const [llave, valor] = linea.split('=>');
                listaItems.push({ id: llave.split('item_name_')[1].trim(), nombre: valor.trim() });
            }
        });
    } catch (e) { console.error("Error cargando items"); }
}

function abrirModalParaSeleccion(tipo) {
    document.getElementById('modal-planner').style.display = "block";
    document.getElementById('seccion-edicion').style.display = "none";
    document.getElementById('pantalla-seleccion').style.display = "block";
    const filtrados = listaItems.filter(i => i.nombre.toLowerCase().includes(tipo.toLowerCase()));
    const contenedor = document.getElementById('lista-modal');
    contenedor.innerHTML = '';
    filtrados.forEach(item => {
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
}

function actualizarInfo() {
    const rarezaSelect = document.getElementById('select-rareza');
    const color = rarezaSelect.options[rarezaSelect.selectedIndex].getAttribute('data-color');
    document.getElementById('item-preview-img').style.borderColor = color;
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(mod && valor) {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerText = mod + ": " + valor;
        document.getElementById('lista-mods-agregados').appendChild(div);
        document.getElementById('input-valor-mod').value = '';
    }
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }
cargarDatos();
