
/*
================================================================================================================================================================================

Fichier contenant toutes les fonctionnalités nécessaires pour les événements du jeu :

- La variable "chooseEvent" contenant la sélection des boutons de triche activant un événement
- La fonction "eventGame" permettant l'affichage des événements et de gérer les scores / effets
- L'activation des boutons de triche sur les événements

================================================================================================================================================================================
*/


import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { randomNumber } from './game.js';


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// SÉLECTION ET STOCKAGE DES BOUTONS ÉVÉNEMENTS DANS LA SECTION TRICHE
const chooseEvent = document.querySelectorAll('.chooseEvent button');


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LES EVENEMENTS ET ENREGISTRE LES EFFETS
let eventGame = (type) => {

    // ----------------------------------------------------
    // En cas de paramètre d'entrée, on stocke cette donnée, sinon on fait appel à un nombre aléatoire qu'on stocke à la place
    let eventType = (type) ? Number(type) : randomNumber();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // En l'absence de paramètre d'entrée, si le nombre aléatoire sorti est supérieur ou égal à celui indiqué, il n'y aura pas d'évènement ; on stoppe le script
    if (type === undefined && eventType >= 20) {
        return false;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // On relance la fonction du nombre aléatoire avec un paramètre d'entrée cette fois pour déterminer quel événement va se déclencher
    eventType = (type) ? Number(type) : randomNumber(gameEvent.length);
    // ----------------------------------------------------
    
    // ----------------------------------------------------
    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    fightZone.classList.add('hide');
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Affiche toutes les informations relatives à l'évènement et lance l'audio
    eventImg.title = gameEvent[eventType].name;
    eventImg.src = gameEvent[eventType].src;
    eventImg.alt = gameEvent[eventType].alt;
    eventText.textContent = gameEvent[eventType].text;
    eventEffect.textContent = gameEvent[eventType].effect;
    gameEvent[eventType].audio.play();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Mets en place les effets de l'évènement selon son type
    switch(eventType) {
        // Les scores de la partie en cours passent en négatif
        case 0:
            following.classList.remove('hide');
            games.scores.user = -games.scores.user;
            games.scores.ia = -games.scores.ia;
            break;
        // Les scores de la partie en cours sont divisés par deux et s'arrondissent au nombre inférieur
        case 1:
            following.classList.remove('hide');
            games.scores.user = Math.round(games.scores.user /2);
            games.scores.ia = Math.round(games.scores.ia /2);
            break;
        // La partie se termine prématurément sur une égalité
        case 2:
            finished.classList.remove('hide');
            finished.addEventListener('click', () => {
                eventGameDisplay.classList.add('hide');
                resultGame.classList.remove('hide');
                fightZone.classList.add('hide');
                gameEvent[eventType].audio.pause();
                endGame(eventType);
            });
            break;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // On met à jour le local storage sur l'événement et on appel la fonction de sauvegarde
    games.event = true;
    saveToLocalStorage();
    // ----------------------------------------------------

    // Confirme la survenue d'un événement en renvoyant "true"
    return true;
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// ACTIVE UN ÉVÉNEMENT DU JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseEvent.forEach(element => {
    element.addEventListener('click', () => {
        eventGame(element.value);
    });
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------


export { eventGame };