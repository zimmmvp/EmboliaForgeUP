let listaItems = [];

async function cargarDatos() {
    try {
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        listaItems = [];
        texto.split('\n').forEach(linea => {
            if (linea.includes('item_name_')) {
                const [llave, valor] = linea.split('=>');
                listaItems.push({ nombre: valor.trim() });
            }
        });
    } catch (e) { console.error("Error al cargar datos"); }
}

function abrirModalParaSeleccion() {
    document.getElementById('modal-planner').style.display = "block";
    const contenedor = document.getElementById('lista-modal');
    contenedor.innerHTML = '';
    listaItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerText = item.nombre;
        div.onclick = () => {
            document.getElementById('modal-titulo').innerText = "Editar: " + item.nombre;
            document.getElementById('pantalla-seleccion').style.display = "none";
            document.getElementById('seccion-edicion').style.display = "block";
        };
        contenedor.appendChild(div);
    });
}

function cerrarModal() {
    document.getElementById('modal-planner').style.display = "none";
    document.getElementById('pantalla-seleccion').style.display = "block";
    document.getElementById('seccion-edicion').style.display = "none";
}

cargarDatos();
