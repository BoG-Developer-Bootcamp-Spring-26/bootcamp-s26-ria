let currentId = 1; 
let mode = "moves"; 

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const sprite = document.getElementById("sprite"); 
const nameEl = document.getElementById("name"); 
const typesEl = document.getElementById("types"); 
const contentBox = document.getElementById("content-box"); 
const panelTitle = document.getElementById("panel-title");

async function loadPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json(); 

    sprite.src = data.sprites.front_default; 

    nameEl.textContent = data.name; 

    typesEl.innerHTML = "";
    data.types.forEach(t => {
        const span = document.createElement("span"); 
        span.className = "type-badge";
        span.textContent = t.type.name; 
        span.style.backgroundColor = typeColors[t.type.name]
        typesEl.appendChild(span);
    });

    if (mode == "moves") {
        showMoves(data);
    } else {
        showInfo(data);
    }

}

function showMoves(data) {
    panelTitle.textContent = "Moves";
    contentBox.innerHTML = " "; 
    data.moves.forEach(m => {
        const div = document.createElement("div");
        div.textContent = m.move.name; 
        contentBox.appendChild(div);
    });
}

function showInfo(data) {
    panelTitle.textContent = "Info"; 
    const stats = {}; 
    data.stats.forEach(s => {
        stats[s.stat.name] = s.base_stat;
    });
    contentBox.innerHTML =  `
    <p> height: ${data.height/10}m</p>
    <p>weight: ${data.weight/10}kg</p>
    <p>hp: ${stats["hp"]}</p>
    <p>attack: ${stats["attack"]}</p>
    <p>defense: ${stats["defense"]}</p>
    <p>special-attack: ${stats["special-attack"]}</p>
    <p>special-defense: ${stats["special-defense"]}</p>
    <p>speed: ${stats["speed"]}</p>

  `;
}

document.getElementById("next").onclick = () =>{
    currentId++; 
    loadPokemon(currentId);
};

document.getElementById("prev").onclick = () => {
    if (currentId > 1) {
        currentId--; 
    }
    loadPokemon(currentId);
};

document.getElementById("movesBtn").onclick = () => {
    mode = "moves";
    changeClass(); 
    loadPokemon(currentId); 

};

document.getElementById("infoBtn").onclick = () => {
    mode = "info";
    changeClass(); 
    loadPokemon(currentId);
};

function changeClass() {
    document.getElementById("infoBtn").classList.toggle("active");
    document.getElementById('movesBtn').classList.toggle("active");
}

loadPokemon(currentId);


