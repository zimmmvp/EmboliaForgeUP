let listaItems = [];

async function cargarDatos() {
    try {
        // Leemos el archivo item.txt
        const res = await fetch('data/item.txt');
        const texto = await res.text();
        
        // Procesamos línea por línea
        const lineas = texto.split('\n');
        
        lineas.forEach(linea => {
            // Solo nos interesan los nombres que empiezan con "item_name_"
            if (linea.includes('item_name_')) {
                const [llave, valor] = linea.split('=>');
                const id = llave.split('item_name_')[1].trim();
                
                listaItems.push({
                    id: id,
                    nombre: valor.trim()
                });
            }
        });

        console.log("Ítems cargados:", listaItems);
        renderizarItems(listaItems);
        
    } catch (error) {
        console.error("Error al cargar los ítems:", error);
    }
}

function renderizarItems(items) {
    const contenedor = document.getElementById('lista-items');
    contenedor.innerHTML = ''; // Limpiar lista
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `<span>${item.nombre}</span>`;
        div.onclick = () => equiparItem(item);
        contenedor.appendChild(div);
    });
}

// Buscador
document.getElementById('buscador').addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const filtrados = listaItems.filter(i => i.nombre.toLowerCase().includes(busqueda));
    renderizarItems(filtrados);
});

// Iniciamos
cargarDatos();
