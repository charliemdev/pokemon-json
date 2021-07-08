function ajax(url, callback) {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(json)
    });
}

let listDiv, detailsDiv, nameEl, numEl, heightEl, weightEl, abilityEl, speciesEl, imageEl, nextEvoEl, typeEl, weaknessEl;

function createHandler(pokemon) {
    return function() {
        nameEl.textContent = pokemon.name;
        imageEl.src = pokemon.image;
        numEl.textContent = pokemon.num;
        heightEl.textContent = pokemon.height;
        weightEl.textContent = pokemon.weight;
        abilityEl.textContent = pokemon.ability;
        speciesEl.textContent = pokemon.species;
        nextEvoEl.textContent = pokemon.next_evolution;

        weaknessEl = weaknessList(pokemon);
        typeEl = typeList(pokemon);

        listDiv.classList.add("hide");
        detailsDiv.classList.remove("hide");
        history.pushState(pokemon, null, pokemon.id); // Store the current pokemon details in the history object
    }
}

function populateList(pokemon) {
    const pokemonsFragment = document.createDocumentFragment();
    pokemon.forEach(function(pokemon) {
        const pokemonDiv = document.createElement("div");
        pokemonDiv.className = "pokemon mb-4 shadow-sm rounded";
        const pokemonName = document.createElement("h2");
        pokemonName.className = "pokemon-name";
        pokemonName.textContent = pokemon.name;
        const pokemonImage = document.createElement("img");
        pokemonImage.className = "pokemon-image";
        pokemonImage.src = pokemon.image;

        pokemonDiv.addEventListener("click", createHandler(pokemon), false)
        pokemonDiv.appendChild(pokemonName) // pokemonName inside pokemonDiv
        pokemonDiv.appendChild(pokemonImage) // pokemonImage inside pokemonDiv
        pokemonsFragment.appendChild(pokemonDiv)
    });
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.appendChild(pokemonsFragment);
}

function typeList(pokemon) {
    const typeFragment = document.createDocumentFragment();
    pokemon.type.forEach(function(pokemon) {
        const pokemonType = document.createElement("p");
        pokemonType.className = "col type";
        pokemonType.textContent = pokemon;

        typeFragment.appendChild(pokemonType)
    });
    const typeList = document.getElementById("p-type");
    typeList.appendChild(typeFragment);
}

function weaknessList(pokemon) {
    const weaknessFragment = document.createDocumentFragment();
    pokemon.weaknesses.forEach(function(pokemon) {
        const pokemonWeakness = document.createElement("p");
        pokemonWeakness.className = "col weakness";
        pokemonWeakness.textContent = pokemon;

        weaknessFragment.appendChild(pokemonWeakness)
    });
    const weaknessList = document.getElementById("p-weakness");
    weaknessList.appendChild(weaknessFragment);
}

function goBack() {
    listDiv.classList.remove("hide");
    detailsDiv.classList.add("hide");
    history.pushState(null, null, "./");

    let type = document.getElementById("p-type");
    while (type.firstChild) {
        type.removeChild(type.firstChild);
    }

    let weakness = document.getElementById("p-weakness");
    while (weakness.firstChild) {
        weakness.removeChild(weakness.firstChild);
    }
}

function doHistory(evnt) {
    if(evnt.state) {
        let pokemon=evnt.state
        nameEl.textContent = pokemon.name;
        imageEl.src = pokemon.image;
        numEl.textContent = pokemon.num;
        heightEl.textContent = pokemon.height;
        weightEl.textContent = pokemon.weight;
        abilityEl.textContent = pokemon.ability;
        speciesEl.textContent = pokemon.species;
        nextEvoEl.textContent = pokemon.next_evolution;

        listDiv.classList.add("hide");
        detailsDiv.classList.remove("hide");
    } else {
        detailsDiv.classList.add("hide");
        listDiv.classList.remove("hide");
    }
}

function init() {
    listDiv = document.querySelector("#pokemon-list");
    detailsDiv = document.querySelector("#pokemon-details");
    nameEl = document.querySelector("#p-title");
    imageEl = document.querySelector("#p-image");
    numEl = document.querySelector("#p-num");
    heightEl = document.querySelector("#p-height");
    weightEl = document.querySelector("#p-weight");
    abilityEl = document.querySelector("#p-ability");
    speciesEl = document.querySelector("#p-species");
    nextEvoEl = document.querySelector("#p-evolution");

    weaknessEl = document.querySelector("#p-weakness");
    typeEl = document.querySelector("#p-type");

    backBtn = document.querySelector("#backBtn");
    backBtn.addEventListener("click", goBack, false);
    detailsDiv.classList.add("hide");
    window.addEventListener("popstate", doHistory, false);

    ajax("./data/pokemon.min.json", populateList);
}

init();




/*

 */