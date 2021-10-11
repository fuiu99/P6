function dumpDamier(damier) {

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let cell = damier[i][j];
            affiche(cell.terrain + "-" + cell.objet + " ");
        }
        affiche("<br/>");
    }
}


function pushMurSurDamier(damier){
let bad = 0;
for (let i = 0; i < 5; i++) {
    let go = false;
    while (go == false) {
        let pt = calculPointAleatoire(6);
        if (damier[pt.x][pt.y].terrain == 0) {
            damier[pt.x][pt.y].terrain = mur; // mur
            go = true;
        } else {
            bad++;
        }
    }
}
}

affiche("bad : " + bad + "<br>")
affiche("<hr>")
pushMurSurDamier(damier);

function pushArmeSurDamier(damier){
bad = 0;
for (let i = 0; i < 5; i++) {
    let go = false;
    while (go == false) {
        let pt = calculPointAleatoire(6);
        if (damier[pt.x][pt.y].terrain == 0 && damier[pt.x][pt.y].objet === false) {
            monArme = Math.floor(Math.random() * armurerie.length);  // > numero de l'arme dans l'armurerie

            damier[pt.x][pt.y].objet = monArme; // mur
            go = true;
        } else {
            bad++;
            if (bad == 100) { killme(); }
        }
    }
}
}
affiche("bad : " + bad + "<br>")
affiche("<hr>")
pushArmeSurDamier(damier);


function pushJoueurSurDamier(damier) {
    bad = 0;
    for (let i = 0; i < 5; i++) {
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(6);
            if (damier[pt.x][pt.y].terrain == 0 && damier[pt.x][pt.y].objet === false) {
                monPlayer = Math.floor(Math.random() * player.length);  

                damier[pt.x][pt.y].objet = monPlayer;
                go = true;
            } else {
                bad++;
                if (bad == 100) { killme(); }
            }
        }
    }
}
affiche("bad : " + bad + "<br>")
affiche("<hr>")
pushJoueurSurDamier(damier);


