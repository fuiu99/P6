
class Damier {
    constructor(){
    this.taille = 10;
    this.damier = false;
    this.players =[];
    this.armes = [];
    this.cellsMovable = [];
}

 nouveauTerrain() {

    let tmp = { terrain: vide, objet: false, joueur: false }

    return tmp;
}

// créer le damier VIDE aevc terrain par defaut
 createDamier() {

    let lignes = new Array(this.taille);

     /*for (let i = 0; i < this.taille; i++) {
         let colonne = new Array(this.taille);
        lignes[i] = colonne;
    }
    */
     let start = this.nouveauTerrain()
     for (let i = 0; i < this.taille; i++) {
         lignes[i] = []
         for (let j = 0; j < this.taille; j++) {
            lignes[i][j] = start;
             start = this.nouveauTerrain(this.taille)
        }
    }
    this.damier = lignes;
}


 placerDecor(){

    let startdecor = 0;
    for (let i = 0; i < 5; i++) {
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(10);
            if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].joueur === false && this.damier[pt.x][pt.y].objet === false) {
                this.damier[pt.x][pt.y].terrain = muret; // mur
                go = true;
            } else {
                startdecor++;
            }
        }
    }
}
 placerArme(armurerie){

    let startarme = 0;
    for(let i = 0; i < 5; i++) {
    let go = false;
    while (go == false) {
        let pt = calculPointAleatoire(this.taille);
        if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].joueur === false && this.damier[pt.x][pt.y].objet === false) {
        //    let monArme = Math.floor(Math.random() * armurerie.length);  // > numero de l'arme dans l'armurerie

            this.damier[pt.x][pt.y].objet = armurerie[i]; // mur
             armurerie[i].coord.x = pt.x;
             armurerie[i].coord.y = pt.y;
             this.armes.push(armurerie[i]);
            go = true;
        } else {
            startarme++;
        }
    }
}
}

takeGun(){

    // si une arme a les mêmes coordonnées qu'une case de déplacement, au click on ajoute dans l'objet player les coordonnées de l'arme sur lequel on click.
    // on fait un balayage de  defineMovableCells()

    for (let i = 0; i < this.cellsMovable; i++) {
    }

}

// place le joueur numéro "joueur" (obj player)
 placerPlayer(joueur){
     let startplayer = 0;
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(this.taille);
            if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].objet === false && this.damier[pt.x][pt.y].joueur === false){
                this.damier[pt.x][pt.y].joueur = joueur;
               joueur.coord.x =pt.x;
               joueur.coord.y =pt.y;
                this.players.push(joueur);
                go= true;
            }else {
                startplayer++;
            }
        }

        // while, coordo random... check case vide....
        
    }
    resetMovableCells(){
        for (let i = 0; i < this.taille; i++) {
            for (let j = 0; j < this.taille; j++) {
                this.damier[i][j].movable = false;
            }
        }

    }

    defineMovableCells() {
        let departJoueur = this.getActivePlayer();
        let xDepart = departJoueur.coord.x;
        let yDepart = departJoueur.coord.y;
        console.log(xDepart,yDepart)

        for(let i= xDepart-1; i>=xDepart-3; i--){

            if (i>= 0 && this.damier[i][yDepart].terrain == 0 && this.damier[i][yDepart].joueur === false) {
                const cell = this.damier[i][yDepart]
                cell.movable = true;
            }else{
                break
            }
        }
        for (let i = xDepart+1 ; i <= xDepart+3; i++) {
                if (i <= 9 && this.damier[i][yDepart].terrain == 0 && this.damier[i][yDepart].joueur === false) {
                    const cell = this.damier[i][yDepart]
                    cell.movable = true;
                } else {
                    break
                }
            }
        for (let i = yDepart-1; i>= yDepart-3; i--) {

            if (i >= 0 && this.damier[xDepart][i].terrain == 0 && this.damier[xDepart][i].joueur === false) {
                const cell = this.damier[xDepart][i]
                    cell.movable = true;
                } else {
                    break
                }}
        for (let i = yDepart+1; i <= yDepart+3; i++) {

            if (i <= 9 && this.damier[xDepart][i].terrain == 0 && this.damier[xDepart][i].joueur === false) {
                const cell = this.damier[xDepart][i]
                        cell.movable = true;
                     } else {
                         break
                     }
                    }
        }

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
    document.querySelector("#damierDOM").innerHTML = "";
    for (let i = 0; i < this.taille; i++) {
        let ligne = "<tr>";
        for (let j = 0; j< this.taille; j++) {
            let celluleID = "cell"+i+"_"+j; // je crée un identifiant unique pour chaque cellule de la forme cell3_5 par exemple
            let cell = this.damier[i][j];
            let cellMovableClass = (cell.movable) ? "movable" : "";
            let colonne = "<td class='" + cellMovableClass + "' id='" + celluleID + "' data-x='" + i + "'  data-y='" + j +"'></td>"

            if(cell.objet!=false){
                colonne = `<td class="${cellMovableClass}" id="${celluleID}">
                <img src='image/${cell.objet.image}'>
                </td>`
            }
            if(cell.joueur!=false){
                colonne = `<td id="${celluleID}"> 
                    <img src='image/${cell.joueur.image}'>
                </td>`
            }
             if(cell.terrain!=vide){
                colonne = `<td id="${celluleID}"> 
                    <img src='image/${ImageMur}'>

                </td>`
            }
            // //  if(cell.movable){

            // //      colonne = "<td class='movable'   data-x='" + i + "'  data-y='" + j +"'></td>"
            // //     }


            ligne += colonne
            affiche(cell.terrain + "-" + cell.objet + " ");
            affiche(cell.terrain + "-" + cell.joueur + " ");
            affiche(cell.terrain + "-" + cell.terrain + " ");
            affiche(muret)

        }
        ligne += "</tr>"

        afficheDom(ligne)

        document.querySelectorAll(".movable").forEach((cellMovable)=>{
            cellMovable.addEventListener("click",()=>{

                this.resetMovableCells()
            

                this.changeCoordActifPlayer(cellMovable.dataset.x, cellMovable.dataset.y)
                this.changeActivePlayer()
                this.defineMovableCells()
                this.draw()
            })
        })

    }

}

    changeCoordActifPlayer(x,y){
        let playerActif= this.getActivePlayer();
        this.damier[playerActif.coord.x][playerActif.coord.y].joueur=false;
        playerActif.coord.x=parseInt(x)
        playerActif.coord.y=parseInt(y)
        this.damier[playerActif.coord.x][playerActif.coord.y].joueur = playerActif;

    }

    getActivePlayer() {
        if (this.players[0].active) {

            return this.players[0];
        }
        return this.players[1]
    }

    changeActivePlayer() {

        // salut 
        if (this.players[0].active) {

            this.players[0].active = false;
            this.players[1].active = true;
        } else {
            this.players[1].active = false;
            this.players[0].active = true;
        }
    }
 

}

