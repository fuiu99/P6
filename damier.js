class Damier {
    constructor(taille) {
        this.taille = taille;
        this.damier = false;
        this.players = [];
        this.armes = [];
        this.cellsMovable = [];
    }

    nouveauTerrain() {
        let tmp = { terrain: vide, objet: false, joueur: false }
        return tmp;
    }

    createDamier() {
        let lignes = new Array(this.taille);
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

    placerDecor() {
        let startdecor = 0;
        for (let i = 0; i < 5; i++) {
            let go = false;
            while (go == false) {
                let pt = calculPointAleatoire(10);
                if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].joueur === false && this.damier[pt.x][pt.y].objet === false) {
                    this.damier[pt.x][pt.y].terrain = muret; 
                    go = true;
                } else {
                    startdecor++;
                }
            }
        }
    }

    placerArme(armurerie) {
        let startarme = 0;
        for (let i = 0; i < 5; i++) {
            let go = false;
            while (go == false) {
                let pt = calculPointAleatoire(this.taille);
                if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].joueur === false && this.damier[pt.x][pt.y].objet === false) {
                    this.damier[pt.x][pt.y].objet = armurerie[i]; 
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

    getArmeInCell(x, y) {
        return this.damier[x][y].objet;
    }

    takeGun(gun) {
        let playerGun = this.getActivePlayer().arme
        if (playerGun) {
            playerGun.x = this.getActivePlayer().x
            playerGun.y = this.getActivePlayer().y
            this.damier[this.getActivePlayer().coord.x][this.getActivePlayer().coord.y].objet = playerGun
        } else {
            this.damier[this.getActivePlayer().coord.x][this.getActivePlayer().coord.y].objet = false
        }
        this.getActivePlayer().arme = gun
        this.changeGunView()
    }

    changeGunView() {
        let viewGun = this.getActivePlayer().arme
        const image = document.querySelector("." + this.getActivePlayer().nom + " .arme");
        image.setAttribute("src", "image/" + viewGun.image);
    }

    placerPlayer(joueur) {
        let startplayer = 0;
        let go = false;
        while (go == false) {
            let pt = calculPointAleatoire(this.taille);
            if (this.damier[pt.x][pt.y].terrain == 0 && this.damier[pt.x][pt.y].objet === false && this.damier[pt.x][pt.y].joueur === false) {
                this.damier[pt.x][pt.y].joueur = joueur;
                joueur.coord.x = pt.x;
                joueur.coord.y = pt.y;
                this.players.push(joueur);
                go = true;
            } else {
                startplayer++;
            }
        }
    }

    playerNearBy() {
        let actifPlayer = this.getActivePlayer();
        let secondPlayer = this.getSecondPlayer();
        const damierInactif = document.querySelector(".damierinactif")
        if (actifPlayer.coord.x == secondPlayer.coord.x && actifPlayer.coord.y - 1 == secondPlayer.coord.y) {
            damierInactif.style.display = "block"
            return true
        }
        if (actifPlayer.coord.x == secondPlayer.coord.x && actifPlayer.coord.y + 1 == secondPlayer.coord.y) {
            damierInactif.style.display = "block"
            return true
        }
        if (actifPlayer.coord.x - 1 == secondPlayer.coord.x && actifPlayer.coord.y == secondPlayer.coord.y) {
            damierInactif.style.display = "block"
            return true
        }
        if (actifPlayer.coord.x + 1 == secondPlayer.coord.x && actifPlayer.coord.y == secondPlayer.coord.y) {
            damierInactif.style.display = "block"
            return true
        }
    }

    initScorePlayer(player) {
        const initScore = document.querySelector("." + player.nom + " .score");
        initScore.value = player.pointDeVie;
    }

    initFightButtons(player) {
        console.log('initFightButtons');
        const attaquerButtons = document.querySelectorAll(".buttonAttaquer");
        attaquerButtons.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("j'attaque");
                const secondPlayer = this.getSecondPlayer();
                const actifPlayer = this.getActivePlayer();
                if (secondPlayer.defense) {
                    secondPlayer.pointDeVie -= actifPlayer.arme.degat / 2;
                } else {
                    secondPlayer.pointDeVie -= actifPlayer.arme.degat;
                }
                this.initScorePlayer(secondPlayer)
                if (secondPlayer.pointDeVie <= 0) {
                    alert('Jeu terminé')
                }
                this.changeActivePlayer();
                this.showButton();
            })
        })

        const defendreButtons = document.querySelectorAll(".buttonDefendre");
        defendreButtons.forEach((button) => {
            button.addEventListener("click", () => {
                console.log("je défends")
                const actifPlayer = this.getActivePlayer();
                actifPlayer.defense = true;
                this.changeActivePlayer();
                this.showButton();
            })
        })
    }
    playerFight() {
        if (this.players[0].active === true) {
            this.fightAction()
        } else { this.defenseAction() }
    }

    getArmeDegat() {
        let armePointOfPlayerActif = this.getActivePlayer().arme.degat;
        console.log(armePointOfPlayerActif)
    }

    resetMovableCells() {
        for (let i = 0; i < this.taille; i++) {
            for (let j = 0; j < this.taille; j++) {
                this.damier[i][j].movable = false;
            }
        }
    }

    showButton() {
        const playerActif = this.getActivePlayer();
        const otherPlayer = this.getSecondPlayer();
        $("." + playerActif.nom + " .buttonFight").show();
        $("." + otherPlayer.nom + " .buttonFight").hide();
    }

    defineMovableCells() {
        let departJoueur = this.getActivePlayer();
        let xDepart = departJoueur.coord.x;
        let yDepart = departJoueur.coord.y;
        for (let i = xDepart - 1; i >= xDepart - 3; i--) {
            if (i >= 0 && this.damier[i][yDepart].terrain == 0 && this.damier[i][yDepart].joueur === false) {
                const cell = this.damier[i][yDepart]
                cell.movable = true;
            } else {
                break
            }
        }
        for (let i = xDepart + 1; i <= xDepart + 3; i++) {
            if (i <= 9 && this.damier[i][yDepart].terrain == 0 && this.damier[i][yDepart].joueur === false) {
                const cell = this.damier[i][yDepart]
                cell.movable = true;
            } else {
                break
            }
        }
        for (let i = yDepart - 1; i >= yDepart - 3; i--) {
            if (i >= 0 && this.damier[xDepart][i].terrain == 0 && this.damier[xDepart][i].joueur === false) {
                const cell = this.damier[xDepart][i]
                cell.movable = true;
            } else {
                break
            }
        }
        for (let i = yDepart + 1; i <= yDepart + 3; i++) {
            if (i <= 9 && this.damier[xDepart][i].terrain == 0 && this.damier[xDepart][i].joueur === false) {
                const cell = this.damier[xDepart][i]
                cell.movable = true;
            } else {
                break
            }
        }
    }

    draw() {
        document.querySelector("#damierDOM").innerHTML = "";
        for (let i = 0; i < this.taille; i++) {
            let ligne = "<tr>";
            for (let j = 0; j < this.taille; j++) {
                let celluleID = "cell" + i + "_" + j; 
                let cell = this.damier[i][j];
                let cellMovableClass = (cell.movable) ? "movable" : "";
                let colonne = "<td class='" + cellMovableClass + "' id='" + celluleID + "' data-x='" + i + "'  data-y='" + j + "'></td>"
                if (cell.objet != false) {
                    colonne = `<td class="${cellMovableClass}" id="${celluleID}" data-x="${i}" data-y="${j}">
                <img src='image/${cell.objet.image}'>
                </td>`
                }
                if (cell.joueur != false) {
                    colonne = `<td id="${celluleID}"> 
                    <img src='image/${cell.joueur.image}'>
                </td>`
                }
                if (cell.terrain != vide) {
                    colonne = `<td id="${celluleID}"> 
                    <img src='image/${ImageMur}'>
                </td>`
                }
                ligne += colonne
            }
            ligne += "</tr>"
            afficheDom(ligne)
            document.querySelectorAll(".movable").forEach((cellMovable) => {
                cellMovable.addEventListener("click", () => {
                    this.resetMovableCells()
                    this.changeCoordActifPlayer(cellMovable.dataset.x, cellMovable.dataset.y)
                    const armeInCell = this.getArmeInCell(cellMovable.dataset.x, cellMovable.dataset.y)
                    if (armeInCell != false) {
                        this.takeGun(armeInCell)
                    }
                    if (this.playerNearBy()) {
                        this.showButton();
                    }
                    else {
                        this.changeActivePlayer()
                    }
                    this.defineMovableCells()
                    this.draw()
                    this.getArmeDegat()
                })
            })
        }
    }

    /**
     * Changement de coord du joueur actif
     * @param {*} x 
     * @param {*} y 
     */
    changeCoordActifPlayer(x, y) {
        let playerActif = this.getActivePlayer();
        this.damier[playerActif.coord.x][playerActif.coord.y].joueur = false;
        playerActif.coord.x = parseInt(x)
        playerActif.coord.y = parseInt(y)
        this.damier[playerActif.coord.x][playerActif.coord.y].joueur = playerActif;
    }


    /**
     * 
     * @returns player
     */
    getActivePlayer() {
        if (this.players[0].active) {
            return this.players[0];
        }
        return this.players[1]
    }

    getSecondPlayer() {
        if (this.players[0].active) {
            return this.players[1];
        }
        return this.players[0]
    }

    changeActivePlayer() {
        if (this.players[0].active) {

            this.players[0].active = false;
            this.players[1].active = true;
        } else {
            this.players[1].active = false;
            this.players[0].active = true;
        }
    }
}

