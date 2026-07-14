// En app.js
async function iniciarPlanner() {
    const [itemsRaw, statsRaw] = await Promise.all([
        fetch('data/items.txt').then(r => r.text()),
        fetch('data/stats.txt').then(r => r.text())
    ]);
    
    // Aquí procesas los textos y los guardas en variables 
    // para usarlos cuando el usuario haga click en un item
    console.log("Datos cargados correctamente");
}
document.addEventListener('DOMContentLoaded', () => {
    console.log("Planner cargado. Esperando archivos de datos...");
    
    // Aquí cargaremos los txt más adelante:
    // fetch('item.txt').then(...)
    // fetch('stats.txt').then(...)
});

// Función para cuando el usuario seleccione un item
function equiparItem(item) {
    console.log("Equipando:", item.nombre);
    // Aquí irá la lógica para actualizar el 'slot' correspondiente
}
