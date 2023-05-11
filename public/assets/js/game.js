
import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';



// MUSIQUE PRINCIPALE
let mainMusic = new Audio("./public/assets/audio/jeu.mp3");

const normalSelect = document.querySelectorAll('.normalCharacters .character input');
const specialSelect = document.querySelectorAll('.specialCharacters .character input');
const cheatCharacter = document.querySelectorAll('.cheatCharacter input');
const chooseEvent = document.querySelectorAll('.chooseEvent button');
const chooseResult = document.querySelectorAll('.chooseResult button');
console.log(games);

if (games.rounds.rounds > 0) {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DONNE UN NOMBRE ALEATOIRE SELON LES BESOINS DU JEU
let randomNumber = (randomType, value) => {

    let Number;

    if (randomType == true) {

        Number = Math.floor(Math.random()*(value));

    } else {

        Number = Math.floor(Math.random() * 100) + 1;

    }

    return Number;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LES EVENEMENTS ET ENREGISTRE LES EFFETS
let eventGame = (type) => {

    // console.log(type);
    let eventType = (type !== undefined) ? Number(type) : randomNumber();
    // console.log(`Le chiffre random event est ${eventType}`);

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'évènement ; on stoppe le script
    if (eventType >= 20) {
        return false;
    }

    // On relance la fonction du nombre aléatoire avec true en paramètre pour obtenir un chiffre entre 0 et 2
    eventType = (type !== undefined) ? Number(type) : randomNumber(true, gameEvent.length);
    
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
                endGame([eventType]);
            });
    }

    
    games.event = true;
    saveToLocalStorage();

    return true;
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------

let specialObtain = () => {

    let specialUserType = randomNumber();
    let specialIaType = randomNumber();
    let resultUser;
    let resultIa;

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'obtention de personnage spéciaux ; on stoppe le script
    if (specialUserType <= 30) {

        specialUserType = randomNumber(true, userCharacters.special.length);

        if(games.userSpecialCharacters[specialUserType] == false) {
            resultUser = true;
        }
        
        games.userSpecialCharacters[specialUserType] = true;

        specialSelect[specialUserType].classList.replace('inactive', 'active');

        specialSelect[specialUserType].addEventListener('click', specialUse);
    }

    if (specialIaType <= 30) {
        
        specialIaType = randomNumber(true, iaCharacters.special.length);

        if(games.iaSpecialCharacters[specialIaType] == false) {
            resultIa = true;
        }

        games.iaSpecialCharacters[specialIaType] = true;

    }

    if (resultUser == true && resultIa == true) {
        specialText.textContent = 'Vous et l\'ordinateur avez reçu un personnage spécial !';
    } else if (resultUser == true) {
        specialText.textContent = 'Vous avez reçu un personnage spécial !';
    } else if (resultIa == true) {
        specialText.textContent = 'L\'ordinateur a reçu un personnage spécial !';
    }

    saveToLocalStorage();
}


// UTILISATION DES PERSONNAGES SPECIAUX
let specialUse = (element) => {

    let special = Number(element.target.value);
    console.log(element.target);

    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    following.classList.remove('hide');
    fightZone.classList.add('hide');

    // Affiche toutes les informations relatives au personnage spécial utilisé
    eventImg.title = userCharacters.special[special].name;
    eventImg.src = userCharacters.special[special].src;
    eventImg.alt = userCharacters.special[special].alt;
    eventText.textContent = userCharacters.special[special].text;
    eventEffect.textContent = userCharacters.special[special].effect;
    userCharacters.special[special].audio.play();

    switch (special) {
        case 0:
            games.scores.ia -= 1;
            break;
        case 1:
            
            break;
        case 2:
            games.scores.user += 1;
            break;
    
        default:
            let hontoscopeDecision = Math.floor(Math.random() * 2);
            console.log('le random hontoscope est ' + hontoscopeDecision);
            if (hontoscopeDecision == false) {
                games.scores.user -= 2;
            } else {
                games.scores.ia -= 2;
            }
    }

    
    games.userSpecialCharacters[special] = false;
    specialSelect[special].classList.replace('active', 'inactive');
    specialSelect[special].removeEventListener('click', specialUse);


    saveToLocalStorage();
}

// DETERMINE QUAND L'ORDINATEUR UTILISE SES PROPRES PERSONNAGES SPECIAUX
let iaSpecialUse = () => {

    console.log(games.iaSpecialCharacters);
    // Vérifie si l'ordinateur possède un personnage spécial ; si ce n'est pas le cas, fin du script
    if (!games.iaSpecialCharacters.includes(true)) {
        return false;
    }

    let special = [];

    games.iaSpecialCharacters.forEach((element, index) => {
        
        if (element == true) {
            special.push(index);
        }
    });

    let witchSpecial = randomNumber(true,special.length);
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
                
                break;
            case 2:
                games.scores.ia += 1;
                break;
        
            default:
                let hontoscopeDecision = Math.floor(Math.random() * 2);
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

    // Création d'un tableau avec toutes les classes de fond de la partie affrontement
    const classes = roundResults.map(result => result.class);

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

// EFFECTUE LES TESTS POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
let battle = (element) => {

    // Si aucun évènement n'a encore eu lieu, on lance le script pour en faire apparaitre un potentiellement
    if (games.event === false) {
        let resultEvent = eventGame();
        if (resultEvent === true) {
            return false;
        }
    }

    // let resultIaSpecialUse = iaSpecialUse();

    // if (resultIaSpecialUse === true) {
    //     return false;
    // }

    games.lastCharacters.user = Number(element.target.value);
    games.lastCharacters.ia = randomNumber(true, iaCharacters.normal.length);
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


    // Lancement du script pour obtenir ou non un personnage spécial
    specialObtain();

    console.log('Le résultat du combat est ' + result);
    score(result);
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------


cleanScores.addEventListener('click', cleanLocalStorage);
restart.addEventListener('click', cleanLocalStorage);


// PERMET DE DECLENCHER L'AFFRONTEMENT
normalSelect.forEach(element => {
    element.addEventListener('click', battle)
});

normalSelect.forEach(element => {
    element.addEventListener('mouseover', () => {
        let sound = new Audio("./public/assets/audio/sound.mp3");
        sound.play();
    })
});

// ACTIVE UN PERSONNAGE SPECIAL SELON CELUI QUI EST CLIQUÉ DANS LA PARTIE TRICHE
cheatCharacter.forEach(element => {
    element.addEventListener('click', specialUse)
});

// ACTIVE UN ÉVÉNEMENT DU JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseEvent.forEach(element => {
    element.addEventListener('click', () => {
        eventGame(element.value);
    });
});

// ACTIVE UNE FIN DE JEU SELON LE BOUTON DE TRICHE CLIQUÉ
chooseResult.forEach(element => {
    element.addEventListener('click', () => {
        endGame(element.value);
    });
});


// RÉINITIALISE LES SCORES DE LA DERNIÈRE PARTIE À ZÉRO EN CAS DE FERMETURE DE LA PAGE EN FIN DE PARTIE
window.addEventListener('beforeunload', (event) => {

    if (userScore.textContent == 10 || iaScore.textContent == 10) {
        cleanLocalStorage();
    }

});


// POUR CHAQUE PERSONNAGE SPECIAL OBTENU DANS LE LOCAL STORAGE, ACTIVATION LORS DE L'OUVERTURE DE LA PAGE
for (let i = 0; i < games.userSpecialCharacters.length; i++) {
    if (games.userSpecialCharacters[i] === true) {
        specialSelect[i].classList.replace('inactive', 'active');
        specialSelect[i].addEventListener('click', specialUse);
    }
}  


// window.addEventListener('load', () => {
//     mainMusic.play();
//     mainMusic.volume = 0.5;
//     mainMusic.loop = true;
// })