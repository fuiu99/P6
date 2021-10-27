class player {
    constructor(nom, img, statutActif) {
        this.nom = nom;
        this.image = img;
        this.active = false;
        this.pointDeVie = 100;
        this.coord = {x:0,y:0};
        this.cellMovable =[];
        this.arme = null;
    }
}

