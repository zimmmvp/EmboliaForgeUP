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
