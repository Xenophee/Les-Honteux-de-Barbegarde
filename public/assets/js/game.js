
import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { specialSelect, specialAllow, specialObtain, specialUse } from './special.js';
import { eventGame } from './event.js';



// MUSIQUE PRINCIPALE
let mainMusic = new Audio("./public/assets/audio/jeu.mp3");

// Création d'un tableau avec toutes les classes de fond de la partie affrontement
const classes = roundResults.map(result => result.class);

const normalSelect = document.querySelectorAll('.normalCharacters .character input');
// const specialSelect = document.querySelectorAll('.specialCharacters .character input');
// const cheatCharacter = document.querySelectorAll('.cheatCharacter input');
// const chooseEvent = document.querySelectorAll('.chooseEvent button');
const chooseResult = document.querySelectorAll('.chooseResult button');
console.log(games);

if (games.rounds.rounds > 0) {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DONNE UN NOMBRE ALEATOIRE SELON LES BESOINS DU JEU
let randomNumber = (value) => {

    let Number;

    if (value) {

        Number = Math.floor(Math.random()*(value));

    } else {

        Number = Math.floor(Math.random() * 100) + 1;

    }

    return Number;
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------


// DETERMINE QUAND L'ORDINATEUR UTILISE SES PROPRES PERSONNAGES SPECIAUX
let iaSpecialUse = () => {

    console.log(games.iaSpecialCharacters);
    // Vérifie si l'ordinateur possède un personnage spécial ; si ce n'est pas le cas, fin du script
    if (!games.iaSpecialCharacters.includes(true) || games.permission.ia > games.rounds.rounds) {
        console.log('je passe pas');
        return false;
    }

    let special = [];

    games.iaSpecialCharacters.forEach((element, index) => {
        
        if (element === true) {
            special.push(index);
        }
    });

    let witchSpecial = randomNumber(special.length);
    // console.log('Le spécial ia est ' + witchSpecial);
    let chanceNumber = randomNumber();
    console.log('Le nombre chance IA est de ' + chanceNumber);

    if (chanceNumber >= 20) {
        return false;
    }

        // Change la scène pour les évènements
        eventGameDisplay.classList.remove('hide');
        following.classList.remove('hide');
        fightZone.classList.add('hide');

        // Affiche toutes les informations relatives au personnage spécial utilisé
        eventImg.title = iaCharacters.special[special[witchSpecial]].name;
        eventImg.src = iaCharacters.special[special[witchSpecial]].src;
        eventImg.alt = iaCharacters.special[special[witchSpecial]].alt;
        eventText.textContent = iaCharacters.special[special[witchSpecial]].text;
        eventEffect.textContent = iaCharacters.special[special[witchSpecial]].effect;
        iaCharacters.special[special[witchSpecial]].audio.play();

        games.iaSpecialCharacters[special[witchSpecial]] = false;
        // console.log('Je renvoi ' + special[witchSpecial]);

        switch (special[witchSpecial]) {
            case 0:
                games.scores.user -= 1;
                break;
            case 1:
                games.permission.user = games.rounds.rounds + 3;
                specialAllow();
                break;
            case 2:
                games.scores.ia += 1;
                break;
        
            default:
                let hontoscopeDecision = randomNumber(2);
                // console.log('le random hontoscope est ' + hontoscopeDecision);
                if (hontoscopeDecision == false) {
                    games.scores.ia -= 2;
                } else {
                    games.scores.user -= 2;
                }
    }

    saveToLocalStorage();
    return true;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LE RESULTAT FINAL DE LA PARTIE ET METS A JOUR LES SCORES
let endGame = (result) => {

    // Mets la musique principale en pause
    mainMusic.pause();

    // Changement de scène avec affichage du résultat de la partie
    resultGame.classList.remove('hide');
    resultSentence.classList.remove('hide');
    eventGameDisplay.classList.add('hide');
    following.classList.add('hide');
    fightZone.classList.add('hide');

    // Affiche la bannière et le résultat final avec l'accompagnement audio
    banner.src = gameOver[result].banner;
    gameResult.textContent = gameOver[result].title;
    gameOver[result].audio.play();

    // Débloque le bouton pour la récompense en cas de victoire et met à jour les scores globaux
    switch(Number(result)) {
        case 0:
            games.games.defeats += 1;
            resultSentence.textContent = `Dommage ! Vous avez été battu par l'ordinateur avec un score de ${games.scores.ia} contre ${games.scores.user} pour vous.`;
            break;
        case 1:
            takeReward.classList.remove('hide');
            games.games.victories += 1;
            resultSentence.textContent = `Félicitation ! Vous avez remporté cette partie avec un score de ${games.scores.user} contre ${games.scores.ia} pour l'ordinateur.`;
            break;
        default:
            games.games.equalities += 1;
    }

    resultSentence.textContent += ` La partie s'est déroulée en ${games.rounds.rounds} manches.`;
    games.games.matches += 1;

    // Appel de la fonction de sauvegarde dans le local storage
    saveToLocalStorage();
}



// MET A JOUR LE SCORE DE LA PARTIE
let score = (result) => {

    // En fonction des tests effectués dans la fonction précédente, on ajoute un point à l'utilisateur ou à l'ordinateur
    switch (result) {
        case 1 :
            games.scores.user += 1;
            games.rounds.success += 1;
            break;
        case 0 :
            games.scores.ia += 1;
            games.rounds.fail += 1;
            break;
        default :
            games.rounds.equal += 1;
    }

    games.rounds.rounds += 1;
    saveToLocalStorage();

    // Affichage du texte pour signaler le résultat de la manche
    roundResult.textContent = roundResults[result].title;

    // Retire toutes les classes qui change le fond de la partie affrontement
    classes.forEach(element => {
        fight.classList.remove(element);
    });

    // Ajout de la classe pour le fond de la partie affrontement
    fight.classList.add(roundResults[result].class);

    console.log(`Le score user est ${userScore.textContent} et le score ia est ${iaScore.textContent}`);

    // Termine la partie dès qu'un score atteint 10
    if (games.scores.user == 10 || games.scores.ia == 10) {

        let result = (games.scores.user == 10) ? 1 : 0;

        endGame(result);
    }
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------


let fightResult = () => {

    let result;
    
    switch (games.lastCharacters.user) {
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
    }

    return result;
}



// -------------------------------------------------------------------------------------------------------------------------------------------------------

// EFFECTUE LES TESTS POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
let battle = (element) => {

    console.log(games);

    // Si aucun évènement n'a encore eu lieu, on lance le script pour en faire apparaitre un potentiellement
    if (games.event === false && (games.scores.ia > 2 || games.scores.user > 2)) {
        let resultEvent = eventGame();
        if (resultEvent === true) {
            return false;
        }
    }

    let resultIaSpecialUse = iaSpecialUse();

    if (resultIaSpecialUse === true) {
        return false;
    }

    games.lastCharacters.user = Number(element.target.value);
    games.lastCharacters.ia = randomNumber(iaCharacters.normal.length);
    let result = fightResult();
    

    // Lancement du script pour obtenir ou non un personnage spécial
    specialObtain();

    specialAllow();

    // console.log('Le résultat du combat est ' + result);
    score(result);
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------


cleanScores.addEventListener('click', cleanLocalStorage);
restart.addEventListener('click', cleanLocalStorage);


// PERMET DE DECLENCHER L'AFFRONTEMENT SUR LES PERSONNAGES DE BASE ET AJOUT D'UN SON AU SURVOL
normalSelect.forEach(element => {
    element.addEventListener('click', battle);

    element.addEventListener('mouseover', () => {
        let sound = new Audio("./public/assets/audio/sound.mp3");
        sound.play();
    });
});


// ACTIVE UNE FIN DE JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseResult.forEach(element => {
    element.addEventListener('click', () => {
        endGame(element.value);
    });
});





// window.addEventListener('load', () => {
//     mainMusic.play();
//     mainMusic.volume = 0.5;
//     mainMusic.loop = true;
// })


export { randomNumber };