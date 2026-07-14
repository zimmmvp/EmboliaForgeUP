
const habilidades = [
    { nombre: "Golpe de Sombras", nivel: 0 },
    { nombre: "Escudo de Embolia", nivel: 0 }
];

function renderSkills() {
    const list = document.getElementById('skills-list');
    list.innerHTML = habilidades.map(s => `
        <div class="skill-item">
            ${s.nombre} - Puntos: ${s.nivel}
        </div>
    `).join('');
}

// Inicializar
renderSkills();
