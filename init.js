$(document).ready(function () {
   init()
});
const vide = 0;
const muret = 1;
let armurerie = [];
let imageMur = `mur.jpg`;

function initArme() {
   armurerie.push(new arme("poignard", 10, `arme0.png`));
   armurerie.push(new arme("pistolet", 20, `arme1.png`));
   armurerie.push(new arme("fusille", 30, `arme2.png`));
   armurerie.push(new arme("automatique", 40, `arme3.png`));
   armurerie.push(new arme("superAutomatique", 50, `arme4.png`));
   return armurerie;
}

function init() {
   let armurerie = initArme();  
   let joueur1 = new player("joueur1", `player1.png`, 100, { x: 0, y: 0 })  
   let joueur2 = new player("joueur2", `player2.png`, 100, { x: 0, y: 0 })  
   joueur1.arme = armurerie[0];
   joueur2.arme = armurerie[0];
   let damier = new Damier(10)    
   damier.createDamier();   
   damier.placerDecor();   
   damier.placerArme(armurerie);  
   damier.placerPlayer(joueur1);  
   damier.placerPlayer(joueur2);  
   damier.initScorePlayer(joueur1)
   damier.initScorePlayer(joueur2)
   damier.changeActivePlayer()
   damier.defineMovableCells()
   damier.initFightButtons()
   damier.draw()   
}














