const habilidades = [
    { id: 1, nombre: "Golpe de Sombras", puntos: 0 },
    { id: 2, nombre: "Escudo de Embolia", puntos: 0 },
    { id: 3, nombre: "Ráfaga Ácida", puntos: 0 }
];

function renderSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = habilidades.map(s => `
        <div class="skill-card" onclick="sumarPunto(${s.id})">
            <h3>${s.nombre}</h3>
            <p>Puntos asignados: <strong>${s.puntos}</strong></p>
            <small>Haz clic para sumar punto</small>
        </div>
    `).join('');
}

function sumarPunto(id) {
    const habilidad = habilidades.find(s => s.id === id);
    if (habilidad.puntos < 20) { // Límite de 20 puntos por habilidad
        habilidad.puntos++;
        renderSkills();
    }
}

// Cargar al iniciar
renderSkills();
