
/*
================================================================================================================================================================================

Fichier contenant toutes les fonctionnalités nécessaires à l'utilisation des personnages spéciaux :

- La sélection de tous les personnages spéciaux dans le cadre normal et de tricherie
- La fonction "specialAllow" permettant l'activation ou la désactivation des personnages spéciaux de l'utilisateur
- La fonction "specialObtain" permettant de déterminer l'obtention d'un personnage spécial pour l'utilisateur et l'ordinateur
- La fonction "specialUse" permettant de gérer toutes les conséquences relatives à l'utilisation d'un spécial par l'utilisateur
- La fonction "iaSpecialUse" permettant de déterminer si l'ordinateur utilise un spécial, gère les scores et l'affichage en conséquence
- L'activation des personnages spéciaux de la section triche

================================================================================================================================================================================
*/


import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { randomNumber } from './game.js';


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// SÉLECTION ET STOCKAGE DE TOUS LES PERSONNAGES SPÉCIAUX EN UTILISATION NORMALE ET EN TRICHE
const specialSelect = document.querySelectorAll('.specialCharacters .character input');
const cheatCharacter = document.querySelectorAll('.chooseCard button');


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// LANCEMENT DU SON AU SURVOL D'UN PERSONNAGE SPÉCIAL
const specialSound = () => {
    let sound = new Audio("./public/assets/audio/boing.mp3");
        sound.play();
        sound.volume = 0.5;
};

// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AUTORISE OU NON L'UTILISATION DES PERSONNAGES SPECIAUX PAR L'UTILISATEUR
const specialAllow = () => {

    // Si la permission est inférieure au nombre total de manches ou égal à zéro, on procède à l'activation
    if (games.permission.user <= games.rounds.rounds || games.permission.user == 0) {
        games.userSpecialCharacters.forEach((element, index) => {
            // Ajout d'un écouteur d'événement pour chaque personnage dont la valeur est "true" dans le tableau
            if (element === true) {
                specialSelect[index].addEventListener('click', specialUse);
                specialSelect[index].addEventListener('mouseover', specialSound);
                specialSelect[index].classList.replace('inactive', 'active');
            };
        });
    // Sinon désactivation des personnages
    } else {
        games.userSpecialCharacters.forEach((element, index) => {
            // Désactivation des écouteurs d'événement pour chaque personnage dont la valeur est "true" dans le tableau
            if (element === true) {
                specialSelect[index].removeEventListener('click', specialUse);
                specialSelect[index].removeEventListener('mouseover', specialSound);
                specialSelect[index].classList.replace('active', 'inactive');
            };
        });
    };
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// FONCTION QUI PERMET DE DEFINIR L'OBTENTION OU NON D'UN PERSONNAGE SPECIAL PAR L'UTILISATEUR OU L'ORDINATEUR
const specialObtain = () => {

    // ----------------------------------------------------
    // Déclaration des variables nécessaire à la fonction et appel deux fois de la fonction pour obtenir un nombre aléatoire
    let specialUserType = randomNumber();
    let specialIaType = randomNumber();
    let resultUser;
    let resultIa;

    // ----------------------------------------------------
    // Si le nombre aléatoire sorti est inférieur au nombre indiqué, obtention pour l'utilisateur !
    if (specialUserType <= 20) {

        // Détermine quel personnage spécial débloquer
        specialUserType = randomNumber(userCharacters.special.length);

        // Si le personnage n'est pas déjà débloqué, on prépare l'annonce à l'utilisateur
        if(games.userSpecialCharacters[specialUserType] == false) {
            resultUser = true;
        };
        
        // On met à jour le local storage avec la valeur du personnage concerné qui passe à true
        games.userSpecialCharacters[specialUserType] = true;

        // Appel de la fonction d'activation des personnages spéciaux de l'utilisateur
        specialAllow();
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Si le nombre aléatoire sorti est inférieur au nombre indiqué, obtention pour l'ordinateur !
    if (specialIaType <= 20) {
        
        // Détermine quel personnage spécial débloquer
        specialIaType = randomNumber(iaCharacters.special.length);

        // Si le personnage n'est pas déjà débloqué, on prépare l'annonce à l'utilisateur
        if(games.iaSpecialCharacters[specialIaType] == false) {
            resultIa = true;
        };

        // On met à jour le local storage avec la valeur du personnage concerné qui passe à true
        games.iaSpecialCharacters[specialIaType] = true;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Indique à l'utilisateur les cas d'obtention de personnages spéciaux
    if (resultUser == true && resultIa == true) {
        specialText.textContent = 'Vous et l\'ordinateur avez reçu un personnage spécial !';
    } else if (resultUser == true) {
        specialText.textContent = 'Vous avez reçu un personnage spécial !';
    } else if (resultIa == true) {
        specialText.textContent = 'L\'ordinateur a reçu un personnage spécial !';
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Lance un son d'avertissement en cas d'obtention de spécial par l'utilisateur
    if (resultUser == true) {
        const specialSound = new Audio("./public/assets/audio/special_obtain.mp3")
        specialSound.play();
    }
    // ----------------------------------------------------

    // Appel de la fonction de sauvegarde
    saveToLocalStorage();
}


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// UTILISATION DES PERSONNAGES SPECIAUX
const specialUse = (element) => {

    // ----------------------------------------------------
    // Stocke l'indication du personnage utilisé dans une variable
    let special = Number(element.target.value);
    let infoType;
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    eventGameDisplay.classList.remove('event');
    following.classList.remove('hide');
    fightZone.classList.add('hide');
    // ----------------------------------------------------

    // ----------------------------------------------------
    // En fonction du personnage spécial utilisé, réajuste les scores / permissions de la partie
    switch (special) {
        // Retire un point à l'ordinateur
        case 0:
            games.scores.ia -= 1;
            break;
        // Empêche l'utilisation des spéciaux pendant 3 tours à l'ordinateur
        case 1:
            games.permission.ia = games.rounds.rounds + 3;
            break;
        // Ajoute un point à l'utilisateur
        case 2:
            games.scores.user += 1;
            break;
        // Une chance sur deux de retirer deux points à l'utilisateur ou l'ordinateur
        case 3:
            let hontoscopeDecision = Math.floor(Math.random() * 2);
            if (hontoscopeDecision == false) {
                games.scores.user -= 2;
            } else {
                games.scores.ia -= 2;
            };
            infoType = hontoscopeDecision;
            break;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Affiche toutes les informations relatives au personnage spécial utilisé et lance l'audio
    eventImg.title = userCharacters.special[special].name;
    eventImg.src = userCharacters.special[special].src;
    eventImg.alt = userCharacters.special[special].alt;

    if (typeof userCharacters.special[special].text === 'string') {
        eventText.textContent = userCharacters.special[special].text;
        eventEffect.textContent = userCharacters.special[special].effect;
    } else {
        eventText.textContent = userCharacters.special[special].text[infoType];
        eventEffect.textContent = userCharacters.special[special].effect[infoType];
    }
    
    userCharacters.special[special].audio.play();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Désactive le personnage spécial qui vient d'être utilisé et le replace à "false" dans le local storage
    games.userSpecialCharacters[special] = false;
    specialSelect[special].classList.replace('active', 'inactive');
    specialSelect[special].removeEventListener('click', specialUse);
    specialSelect[special].removeEventListener('mouseover', specialSound);
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Appel de la fonction de sauvegarde
    saveToLocalStorage();
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

// DETERMINE QUAND L'ORDINATEUR UTILISE SES PROPRES PERSONNAGES SPECIAUX
const iaSpecialUse = () => {

    // ----------------------------------------------------
    // Vérifie si l'ordinateur possède un personnage spécial et s'il a la permission pour en utiliser un ; si ce n'est pas le cas, fin du script
    if (!games.iaSpecialCharacters.includes(true) || games.permission.ia > games.rounds.rounds) {
        return false;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Détermine si l'ordinateur utilise un spécial si le nombre aléatoire retourné est supérieur ou égal à celui attendu ; sinon fin du script
    let chanceNumber = randomNumber();

    if (chanceNumber >= 20) {
        return false;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Récupération des spéciaux disponibles et détermine lequel est finalement utilisé
    let special = [];
    let infoType;

    games.iaSpecialCharacters.forEach((element, index) => {
        if (element === true) {
            special.push(index);
        };
    });

    let witchSpecial = randomNumber(special.length);
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    eventGameDisplay.classList.remove('event');
    following.classList.remove('hide');
    fightZone.classList.add('hide');
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Remet à "false" le personnage spécial qui vient d'être utilisé dans le local storage
    games.iaSpecialCharacters[special[witchSpecial]] = false;
    // ----------------------------------------------------

    // ----------------------------------------------------
    switch (special[witchSpecial]) {
        // Retire un point à l'utilisateur
        case 0:
            games.scores.user -= 1;
            break;
        // Empêche l'utilisation des spéciaux pendant 3 tours à l'utilisateur
        case 1:
            games.permission.user = games.rounds.rounds + 3;
            specialAllow();
            break;
        // Ajoute un point à l'ordinateur
        case 2:
            games.scores.ia += 1;
            break;
        // Une chance sur deux de retirer deux points à l'utilisateur ou l'ordinateur
        case 3:
            let hontoscopeDecision = randomNumber(2);
            if (hontoscopeDecision == false) {
                games.scores.ia -= 2;
            } else {
                games.scores.user -= 2;
            };
            infoType = hontoscopeDecision;
            break;
    };
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Affiche toutes les informations relatives au personnage spécial utilisé
    eventImg.title = iaCharacters.special[special[witchSpecial]].name;
    eventImg.src = iaCharacters.special[special[witchSpecial]].src;
    eventImg.alt = iaCharacters.special[special[witchSpecial]].alt;

    if (typeof iaCharacters.special[special[witchSpecial]].text === 'string') {
        eventText.textContent = iaCharacters.special[special[witchSpecial]].text;
        eventEffect.textContent = iaCharacters.special[special[witchSpecial]].effect;
    } else {
        eventText.textContent = iaCharacters.special[special[witchSpecial]].text[infoType];
        eventEffect.textContent = iaCharacters.special[special[witchSpecial]].effect[infoType];
    }

    iaCharacters.special[special[witchSpecial]].audio.play();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Appel de la fonction de sauvegarde
    saveToLocalStorage();
    // ----------------------------------------------------

    // ----------------------------------------------------
    // Termine la partie dès qu'un score atteint 10
    if (games.scores.user == 10 || games.scores.ia == 10) {

        let result = (games.scores.user == 10) ? 1 : 0;

        endGame(result);
    };
    // ----------------------------------------------------
    
    // Confirme l'utilisation d'un personnage spécial en renvoyant "true"
    return true;
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// POUR CHAQUE PERSONNAGE SPECIAL OBTENU DANS LE LOCAL STORAGE, ACTIVATION LORS DE L'OUVERTURE DE LA PAGE
specialAllow();


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// ACTIVE UN PERSONNAGE SPECIAL SELON CELUI QUI EST CLIQUÉ DANS LA PARTIE TRICHE
cheatCharacter.forEach(element => {
    element.addEventListener('click', specialUse)
});


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------


export { specialSelect, specialAllow, specialObtain, specialUse, iaSpecialUse };