let listaItems = [];
let slotActual = "";

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
}

function cerrarModal() { document.getElementById('modal-planner').style.display = "none"; }
function guardarYEquipar() { cerrarModal(); }

cargarDatos();
// Nota: Asegúrate de inicializar aquí los selectores tal como los tenías antes.
