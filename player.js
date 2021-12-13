class player {
    constructor(nom, img, pointDeVie) {
        this.nom = nom;
        this.image = img;
        this.active = false;
        this.pointDeVie = pointDeVie;
        this.coord = {x:0,y:0};
        this.cellMovable =[];
        this.arme = null;
        this.defense = false;
        this.attaquer = false;
    }
}

