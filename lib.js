function affiche(ceQueJeVeuxAfficher) {
    let afficher = document.querySelector("#afficher")
    afficher.innerHTML += ceQueJeVeuxAfficher;
}

function afficheDom(ceQueJeVeuxAfficher) {
    let afficher = document.querySelector("#damierDOM")
    afficher.innerHTML += ceQueJeVeuxAfficher;
}

function calculPointAleatoire(taille) {
    return {
        x: Math.floor(Math.random() * taille),
        y: Math.floor(Math.random() * taille),
    }
}



