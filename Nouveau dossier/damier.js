
class Damier {
    constructor(){
    this.taille = 10;
    this.damier = false;
}

 nouveauTerrain() {

    let tmp = { terrain: vide, objet: false, joueur: false }

    return tmp;
}

// créer le damier VIDE aevc terrain par defaut
 createDamier() {

    let lignes = new Array(this.taille);

     for (let i = 0; i < this.taille; i++) {
         let colonne = new Array(this.taille);
        lignes[i] = colonne;
    }

     let start = this.nouveauTerrain()
     for (let i = 0; i < this.taille; i++) {
         for (let j = 0; j < this.taille; j++) {
            lignes[i][j] = start;
             start = this.nouveauTerrain(this.taille)
        }
    }
    this.damier = lignes;
}


 placerDecor(){

    let bad = 0;
    for (let i = 0; i < 5; i++) {
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(6);
            if (this.damier[pt.x][pt.y].terrain == 0) {
                this.damier[pt.x][pt.y].terrain = muret; // mur
                go = true;
            } else {
                bad++;
            }
        }
    }
}
 placerArme(armurerie){

    let bad = 0;
    for(let i = 0; i < 5; i++) {
    let go = false;
    while (go == false) {
        let pt = calculPointAleatoire(6);
        if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].joueur === false) {
            let monArme = Math.floor(Math.random() * armurerie.length);  // > numero de l'arme dans l'armurerie

            this.damier[pt.x][pt.y].objet = monArme; // mur
            go = true;
        } else {
            bad++;
        }
    }
}
}

// place le joueur numéro "joueur" (obj player)
 placerPlayer(joueur){
     let bad = 0;
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(6);

            if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].objet === false && this.damier[pt.x][pt.y].joueur === false){
                let player = Math.floor(Math.random() * joueur); 
                this.damier[pt.x][pt.y].joueur = player;
                go= true;
            }else {
                bad++;
    }
        }

        // while, coordo random... check case vide....
        
    }
// affichage mode brute !
 dump() {

    for (let i = 0; i < this.taille; i++) {
        for (let j = 0; j < this.taille; j++) {
            let cell = this.damier[i][j];
            affiche(cell.terrain + "-" + cell.objet + " ");
        }
        affiche("<br/>");
    }
}


draw(){

    for (let i = 0; i < this.taille; i++) {
        let ligne = "<tr>";
        for (let j = 0; j< this.taille; j++) {
            let colonne = "<td></td>"
            ligne += colonne
            let cell = this.damier[i][j];

            affiche(cell.terrain + "-" + cell.objet + " ");
        }
        ligne += "</tr>"

        afficheDom(ligne)
    }
}


parcourirTable(departCase, AxeX, AxeY) {

    let xDepart = departCase.x;
    let yDepart = departCase.y;
    let caseMovable = [];

        for (let i = 1; i <= 3; i++) {

            let moveOnCase = { x: xDepart + i * AxeX, y: yDepart + i * AxeY };
            if (this.damier[pt.x][pt.y].objet === false) {
                break;
                //return;
            } else {
                caseMovable.push(moveOnCase)
            }
        }
        console.log(this.moves)
    }

    getcellMovable(index) {

        this.parcourirTable(this.player[index], 1, 0);     //  a droite
        this.parcourirTable(this.player[index], 0, 1);   // en bas
        this.parcourirTable(this.player[index], -1, 0);  // a gauche
        this.parcourirTable(this.player[index], 0, -1);  // en haut
    }


    drawArme() {
            let pt = calculPointAleatoire(6);

            if ( this.damier[pt.x][pt.y].objet === false) {
               let uneCellDamier= this.damier[pt.x][pt.y].objet;
               let cellDamier = document.querySelector("#damierDOM")

                uneCellDamier.innerHTML = `<img src="${armurerie.image}">`


                console.log(cellDamier)
            //    this.damier.appendChild(imageGun)
              //  let cell = this.damier[i][j];


              //  cell.appendChild(imageGun)
               // afficheDom(imageGun)

            }
        }
    


}

