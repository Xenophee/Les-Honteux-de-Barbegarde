
/*
================================================================================================================================================================================

Fichier contenant les fonctionnalités principales du jeu :

- La fonction "randomNumber" permettant d'obtenir un nombre aléatoire selon le contexte
- La fonction "endGame" permettant de gérer l'affichage de fin de partie du jeu et de mettre à jour les scores finaux
- La fonction "score" permettant la mise à jour des scores à chaque manche et d'en afficher le visuel
- La fonction "fightResult" permettant de définir le gagnant de la manche
- La fonction "battle" comme script principal qui fait appel à tous les autres dans un ordre précis

================================================================================================================================================================================
*/


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { specialSelect, specialAllow, specialObtain, specialUse, iaSpecialUse } from './special.js';
import { eventGame } from './event.js';


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// MUSIQUE PRINCIPALE
const mainMusic = new Audio("./public/assets/audio/jeu.mp3");

// Création d'un tableau avec toutes les classes de fond de la partie affrontement
const classes = roundResults.map(result => result.class);

const normalSelect = document.querySelectorAll('.normalCharacters .character input');
const chooseResult = document.querySelectorAll('.chooseResult button');
console.log(games);


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AU LANCEMENT DE LA PAGE, SI UN SCORE EST A 10, NETTOYAGE DU LOCAL STORAGE
if (games.scores.user == 10 || games.scores.ia == 10) {
    cleanLocalStorage();

// SI UNE PARTIE ÉTAIT DÉJÀ EN COURS, RÉAFFICHAGE DE L'ARÈNE
} else if (games.rounds.rounds > 0) {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DONNE UN NOMBRE ALEATOIRE SELON LES BESOINS DU JEU
const randomNumber = (value) => {

    let Number;

    if (value) {

        Number = Math.floor(Math.random()*(value));

    } else {

        Number = Math.floor(Math.random() * 100) + 1;

    };

    return Number;
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LE RÉSULTAT FINAL DE LA PARTIE ET METS À JOUR LES SCORES
const endGame = (result) => {

    // ----------------------------------------------------
    // Mets la musique principale en pause
    mainMusic.pause();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Changement de scène avec affichage du résultat de la partie
    resultGame.classList.remove('hide');
    resultSentence.classList.remove('hide');
    eventGameDisplay.classList.add('hide');
    fightZone.classList.add('hide');
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Affiche la bannière et le résultat final avec l'accompagnement audio
    banner.src = gameOver[result].banner;
    gameResult.textContent = gameOver[result].title;
    gameOver[result].audio.play();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Débloque le bouton pour la récompense en cas de victoire et met à jour les scores globaux
    switch(Number(result)) {
        // Défaite
        case 0:
            games.games.defeats += 1;
            resultSentence.textContent = `Dommage ! Vous avez été battu par l'ordinateur avec un score de ${games.scores.ia} contre ${games.scores.user} pour vous.`;
            break;
        // Victoire
        case 1:
            takeReward.classList.remove('hide');
            games.games.victories += 1;
            resultSentence.textContent = `Félicitation ! Vous avez remporté cette partie avec un score de ${games.scores.user} contre ${games.scores.ia} pour l'ordinateur.`;
            break;
        // Égalité
        default:
            games.games.equalities += 1;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Met à jour les informations dans le local storage et affiche le compte rendu à l'utilisateur
    resultSentence.textContent += ` La partie s'est déroulée en ${games.rounds.rounds} manches.`;
    games.games.matches += 1;

    // Appel de la fonction de sauvegarde
    saveToLocalStorage();
    // ----------------------------------------------------
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// MET A JOUR LE SCORE DE LA PARTIE
const score = (result) => {

    // ----------------------------------------------------
    // En fonction des tests effectués dans la fonction précédente, on ajoute un point à l'utilisateur ou à l'ordinateur
    switch (result) {
        // Défaite
        case 0:
            games.scores.ia += 1;
            games.rounds.fail += 1;
            break;
        // Victoire
        case 1:
            games.scores.user += 1;
            games.rounds.success += 1;
            break;
        // Égalité
        default:
            games.rounds.equal += 1;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Met à jour les informations dans le local storage et appel de la fonction de sauvegarde
    games.rounds.rounds += 1;
    saveToLocalStorage();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Affichage du texte pour signaler le résultat de la manche
    roundResult.textContent = roundResults[result].title;

    // Retire d'abord toutes les classes qui change le fond de la partie affrontement
    classes.forEach(element => {
        platform.classList.remove(element);
    });

    // Ajout de la classe pour le fond de la partie affrontement
    platform.classList.add(roundResults[result].class);
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Termine la partie dès qu'un score atteint 10
    if (games.scores.user == 10 || games.scores.ia == 10) {

        let result = (games.scores.user == 10) ? 1 : 0;

        // Appel de la fonction de fin de partie
        endGame(result);
    };
    // ----------------------------------------------------
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DÉTERMINE LE RÉSULTAT DE LA MANCHE EN FONCTION DES PERSONNAGES EN PRÉSENCE
const fightResult = () => {

    let result;
    
    switch (games.lastCharacters.user) {
        // ----------------------------------------------------
        // POUR YVETTE
        case 0 :
            if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 1;
            } else if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // ----------------------------------------------------
        // POUR JEAN HARDI
        case 1 :
            if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 1;
            } else if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // ----------------------------------------------------
        // POUR HUTIN
        case 2 :
            if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 1;
            } else if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // ----------------------------------------------------
        // POUR ALAVARE
        case 3 :
            if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 1;
            } else if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // ----------------------------------------------------
        // POUR YVRES
        case 4 :
            if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 1;
            } else if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // ----------------------------------------------------
        // POUR GEHONTE
        case 5 :
            if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 1;
            } else if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 0;
            } else {
                result = 2;
            }
            break;
    };

    // Retourne le résultat obtenu en fonction des tests
    return result;
};



// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// EFFECTUE LES TESTS POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
const battle = (element) => {

    console.log(games);

    // ----------------------------------------------------
    // Si aucun évènement n'a encore eu lieu, et si un des scores (utiliseur ou ordinateur) est supérieur à deux, on lance le script pour en faire apparaitre un potentiellement
    if (games.event === false && (games.scores.ia > 2 || games.scores.user > 2)) {
        let resultEvent = eventGame();
        // Si un évènement a lieu, fin du script
        if (resultEvent === true) {
            return false;
        };
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Lancement du script pour savoir si l'ordinateur va utiliser un personnage spécial
    let resultIaSpecialUse = iaSpecialUse();

    // Si c'est le cas, fin du script
    if (resultIaSpecialUse === true) {
        return false;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Met à jour les derniers personnages utilisés dans le local storage et appel de la fonction de sauvegarde
    games.lastCharacters.user = Number(element.target.value);
    games.lastCharacters.ia = randomNumber(iaCharacters.normal.length);
    saveToLocalStorage();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Lancement du script pour obtenir le résultat de la manche
    let result = fightResult();
    // ----------------------------------------------------
    

    // ----------------------------------------------------
    // Lancement du script pour obtenir ou non un personnage spécial
    specialObtain();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Lancement du script pour mettre à jour les scores
    score(result);
    // ----------------------------------------------------

    // ----------------------------------------------------
    specialAllow();
    // ----------------------------------------------------
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// PERMETS DE FAIRE APPEL À LA FONCTION DE NETTOYAGE DU LOCAL STORAGE SUR LES BOUTONS DE RÉINITIALISATION ET POUR RECOMMENCER UNE PARTIE
cleanScores.addEventListener('click', cleanLocalStorage);

restart.addEventListener('click', () => {
    cleanLocalStorage();
    specialAllow();
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// PERMET DE DECLENCHER L'AFFRONTEMENT SUR LES PERSONNAGES DE BASE ET AJOUT D'UN SON AU SURVOL
normalSelect.forEach(element => {
    element.addEventListener('click', battle);

    element.addEventListener('mouseover', () => {
        let sound = new Audio("./public/assets/audio/sound.mp3");
        sound.play();
    });
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// ACTIVE UNE FIN DE JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseResult.forEach(element => {
    element.addEventListener('click', () => {
        endGame(element.value);
    });
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// PERMETS DE TERMINER LA PARTIE PRÉMATURÉMENT EN ABANDONNANT
surrend.addEventListener('click', () => {
    endGame(0);
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// PERMETS D'AFFICHER LE RÉSULTAT DE LA PARTIE APRÈS L'ÉVÉNEMENT DU CRÉATEUR
finished.addEventListener('click', () => {
    eventGameDisplay.classList.add('hide');
    resultGame.classList.remove('hide');
    fightZone.classList.add('hide');
    finished.classList.add('hide');
    gameEvent[2].audio.pause();
    endGame(2);
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// RÉAFFICHAGE DE L'ARÈNE POUR REFAIRE UNE PARTIE
restart.addEventListener('click', () => {
    resultGame.classList.add('hide');
    gameResultBloc.classList.remove('hide');
    fightZone.classList.remove('hide');

    classes.forEach(element => {
        platform.classList.remove(element);
    });
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// LANCE LA MUSIQUE PRINCIPALE DU JEU
// window.addEventListener('load', () => {
//     mainMusic.play();
//     mainMusic.volume = 0.5;
//     mainMusic.loop = true;
// })

// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------


export { randomNumber };