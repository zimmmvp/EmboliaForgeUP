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
    renderizarItems(listaItems);
}

function abrirModalParaSeleccion(tipo) {
    document.getElementById('modal-planner').style.display = "block";
    document.getElementById('seccion-edicion').style.display = "none";
    document.getElementById('lista-modal').style.display = "block";
    
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
    document.getElementById('lista-modal').style.display = "none";
    document.getElementById('seccion-edicion').style.display = "block";
}

function cerrarModal() {
    document.getElementById('modal-planner').style.display = "none";
}
document.getElementById('input-stats').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const mod = e.target.value;
        if(mod) {
            const div = document.createElement('div');
            div.innerText = "+ " + mod;
            document.getElementById('lista-mods-agregados').appendChild(div);
            e.target.value = ''; // Limpiar input
        }
    }
});
function actualizarColorRareza() {
    const selector = document.getElementById('select-rareza');
    const color = selector.options[selector.selectedIndex].getAttribute('data-color');
    const imgBox = document.getElementById('item-preview-img');
    imgBox.style.borderColor = color;
    imgBox.style.color = color; // Cambia el color del borde y texto según rareza
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    
    if(mod && valor) {
        const contenedor = document.getElementById('lista-mods-agregados');
        const div = document.createElement('div');
        div.innerText = mod + ": " + valor;
        contenedor.appendChild(div);
        
        // Limpiamos los inputs tras agregar
        document.getElementById('input-valor-mod').value = '';
    }
}
// Esta función sincroniza los inputs con el visual de la izquierda
function actualizarInfo() {
    document.getElementById('text-poder').innerText = document.getElementById('input-poder').value || 0;
    document.getElementById('text-grado').innerText = document.getElementById('select-grado').value;
    
    // Cambiar color de rareza
    const rareza = document.getElementById('select-rareza').value;
    document.getElementById('text-rareza').innerText = rareza;
    document.getElementById('item-preview-img').style.borderColor = 
        rareza === 'Magico' ? '#007bff' : '#ffffff';
}

function agregarModSeleccionado() {
    const mod = document.getElementById('select-mods').value;
    const valor = document.getElementById('input-valor-mod').value;
    
    if(mod && valor) {
        const contenedor = document.getElementById('lista-mods-agregados');
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerText = mod + ": " + valor;
        contenedor.appendChild(div);
        
        document.getElementById('input-valor-mod').value = '';
    }
}

// Asegúrate de llamar a actualizarInfo cuando cambie el selector de rareza
document.getElementById('select-rareza').addEventListener('change', actualizarInfo);
cargarDatos();
