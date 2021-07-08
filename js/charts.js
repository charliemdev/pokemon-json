function ajax(url, callback) {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        callback(json)
    });
}

function makeChart(data) {
    const pokemon = data;
    console.log(pokemon);

    const canvasDiv = document.querySelector("#myCanvas");
    const ctx = canvasDiv.getContext("2d");

    const speed = pokemon.map(function(pokemon) {
        return pokemon.stats.speed;
    })
    const hp = pokemon.map(function(pokemon) {
        return pokemon.stats.hp;
    })
    const spec_def = pokemon.map(function(pokemon) {
        return pokemon.stats.spec_def;
    })
    const spec_att = pokemon.map(function(pokemon) {
        return pokemon.stats.spec_att;
    })
    const defense = pokemon.map(function(pokemon) {
        return pokemon.stats.defense;
    })
    const attack = pokemon.map(function(pokemon) {
        return pokemon.stats.attack;
    })


    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["HP", "Speed", "Sp. Defense", "Sp. Attack", "Defense", "Attack"],
            datasets: [{
                label: "Pokemon Stats",
                backgroundColor: "rgb(226,53,13)",
                borderColor: "rgb(226,53,13)",
                data: hp, speed, spec_def, spec_att, defense, attack
            }]
        },
        options: {
            responsive:false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function init() {
    ajax("./data/pokemon.min.json", makeChart);
}
init();