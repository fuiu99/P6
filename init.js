$(document).ready(function () {
   init()
});
const vide = 0;
const muret = 1;
let armurerie = [];
let ImageMur = `mur.jpg`;

function initArme() {
   armurerie.push(new arme("poignard", 10, `arme0.png`));
   armurerie.push(new arme("pistolet", 20, `arme1.png`));
   armurerie.push(new arme("fusille", 30, `arme2.png`));
   armurerie.push(new arme("automatique", 40, `arme3.png`));
   armurerie.push(new arme("superAutomatique", 50, `arme4.png`));
   return armurerie;
}

function init() {
   let armurerie = initArme();  // on crée notre armurerie ! = un array d'arme
   let joueur1 = new player("joueur1", `player1.png`, 20, { x: 0, y: 0 })  // création d'un  player (avec coordonée 0;0)
   let joueur2 = new player("joueur2", `player2.png`, 30, { x: 0, y: 0 })  // création d'un  player (avec coordonée 0;0)
   joueur1.arme = armurerie[0];
   joueur2.arme = armurerie[0];
   let damier = new Damier(10)    // instanciation = création d'un nouveau damier VIDE
   damier.createDamier();   // rempli this.damier !
   damier.placerDecor();   // place les murets
   damier.placerArme(armurerie);  // place les armes
   damier.placerPlayer(joueur1);  // place le joueur 1
   damier.placerPlayer(joueur2);  // place le joueur 2
   damier.initScorePlayer(joueur1)
   damier.initScorePlayer(joueur2)
   damier.changeActivePlayer()
   damier.defineMovableCells()
   damier.initFightButtons()
   damier.draw()   
}














