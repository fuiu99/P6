function affiche(ceQueJeVeuxAfficher) {
    let afficher = document.querySelector("#bloc")
    afficher.innerHTML += ceQueJeVeuxAfficher;
}


function calculPointAleatoire(taille) {
    return {
        x: Math.floor(Math.random() * taille),
        y: Math.floor(Math.random() * taille),
    }
}

function createDamier(taille) {

    let lignes = new Array(taille); 

    for (let i = 0; i < taille; i++) {
        let colonne = new Array(taille); 
        lignes[i] = colonne; 
    }

    let start = nouveauTerrain()
    let n = 0;
    for (let i = 0; i < taille; i++) { 
        for (let j = 0; j < taille; j++) { 
            lignes[i][j] = start;  
            start = nouveauTerrain(taille)
        }
    }
    return lignes;
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


affiche(createDamier(6))


