function calculPointAleatoire(taille) {
    return {
        x: Math.floor(Math.random() * taille),
        y: Math.floor(Math.random() * taille),
    }
}

function dumpDamier(damier) {

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let cell = damier[i][j];
            affiche(cell.terrain + "-" + cell.objet + " ");
        }
        affiche("<br/>");
    }
}


function affiche(ceQueJeVeuxAfficher) {
    let afficher = document.querySelector("#bloc")
    afficher.innerHTML += ceQueJeVeuxAfficher + "<br>";
}


