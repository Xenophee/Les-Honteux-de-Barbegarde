

import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { randomNumber } from './game.js';


const chooseEvent = document.querySelectorAll('.chooseEvent button');

// AFFICHE LES EVENEMENTS ET ENREGISTRE LES EFFETS
let eventGame = (type) => {

    // console.log(type);
    let eventType = (type) ? Number(type) : randomNumber();
    // console.log(`Le chiffre random event est ${eventType}`);

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'évènement ; on stoppe le script
    if (eventType >= 20) {
        return false;
    }

    // On relance la fonction du nombre aléatoire avec true en paramètre pour obtenir un chiffre entre 0 et 2
    eventType = (type) ? Number(type) : randomNumber(gameEvent.length);
    
    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    fightZone.classList.add('hide');

    // Affiche toutes les informations relatives à l'évènement
    eventImg.title = gameEvent[eventType].name;
    eventImg.src = gameEvent[eventType].src;
    eventImg.alt = gameEvent[eventType].alt;
    eventText.textContent = gameEvent[eventType].text;
    eventEffect.textContent = gameEvent[eventType].effect;
    gameEvent[eventType].audio.play();

    // Mets en place les effets de l'évènement selon son type
    switch(eventType) {
        case 0:
            following.classList.remove('hide');
            games.scores.user = -games.scores.user;
            games.scores.ia = -games.scores.ia;
            break;
        case 1:
            following.classList.remove('hide');
            games.scores.user = Math.round(games.scores.user /2);
            games.scores.ia = Math.round(games.scores.ia /2);
            break;
        default:
            finished.classList.remove('hide');
            finished.addEventListener('click', () => {
                eventGameDisplay.classList.add('hide');
                resultGame.classList.remove('hide');
                fightZone.classList.add('hide');
                gameEvent[eventType].audio.pause();
                endGame(eventType);
            });
    }

    games.event = true;
    saveToLocalStorage();

    return true;
}



// ACTIVE UN ÉVÉNEMENT DU JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseEvent.forEach(element => {
    element.addEventListener('click', () => {
        eventGame(element.value);
    });
});



export { eventGame };