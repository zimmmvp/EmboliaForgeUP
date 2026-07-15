let listaItems = [];

async function cargarDatos() {
    const res = await fetch('data/item.txt');
    const texto = await res.text();
    texto.split('\n').forEach(linea => {
        if (linea.includes('item_name_')) {
            const [llave, valor] = linea.split('=>');
            listaItems.push({ id: llave.split('item_name_')[1].trim(), nombre: valor.trim() });
        }
    });
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
    document.getElementById('text-poder').innerText = document.getElementById('input-poder').value || 0;
    document.getElementById('text-grado').innerText = document.getElementById('select-grado').value;
    const rareza = document.getElementById('select-rareza').value;
    document.getElementById('text-rareza').innerText = rareza;
    
    const colores = { 'normal': '#ffffff', 'magico': '#007bff', 'raro': '#ffff00', 'epico': '#ff00ff', 'legendario': '#ff8c00' };
    document.getElementById('item-preview-img').style.borderColor = colores[rareza];
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    if(mod && valor) {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerText = mod + ": " + valor;
        document.getElementById('lista-mods-agregados').appendChild(div);
    }
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }

cargarDatos();
