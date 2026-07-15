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
cargarDatos();
