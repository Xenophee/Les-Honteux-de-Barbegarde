
import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';
import { games, displayGameStat, saveToLocalStorage, cleanLocalStorage } from './localStorage.js';
import { randomNumber } from './game.js';


const specialSelect = document.querySelectorAll('.specialCharacters .character input');
const cheatCharacter = document.querySelectorAll('.cheatCharacter input');


let specialAllow = () => {

    if (games.permission.user < games.rounds.rounds) {
        games.userSpecialCharacters.forEach((element, index) => {
            if (element === true) {
                specialSelect[index].addEventListener('click', specialUse);
                specialSelect[index].classList.replace('inactive', 'active');
            }
        });
    } else {
        games.userSpecialCharacters.forEach((element, index) => {
            if (element === true) {
                specialSelect[index].removeEventListener('click', specialUse);
                specialSelect[index].classList.replace('active', 'inactive');
            }
        });
    }
}



let specialObtain = () => {

    let specialUserType = randomNumber();
    let specialIaType = randomNumber();
    let resultUser;
    let resultIa;

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'obtention de personnage spéciaux ; on stoppe le script
    if (specialUserType <= 30) {

        specialUserType = randomNumber(userCharacters.special.length);

        if(games.userSpecialCharacters[specialUserType] == false) {
            resultUser = true;
        }
        
        games.userSpecialCharacters[specialUserType] = true;

        specialAllow();

    }

    if (specialIaType <= 30) {
        
        specialIaType = randomNumber(iaCharacters.special.length);

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
    // console.log(element.target);

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
            games.permission.ia = games.rounds.rounds + 3;
            break;
        case 2:
            games.scores.user += 1;
            break;
    
        default:
            let hontoscopeDecision = Math.floor(Math.random() * 2);
            // console.log('le random hontoscope est ' + hontoscopeDecision);
            if (hontoscopeDecision == false) {
                games.scores.user -= 2;
            } else {
                games.scores.ia -= 2;
            }
    }

    games.userSpecialCharacters[special] = false;
    specialSelect[special].classList.replace('active', 'inactive');
    specialSelect[special].removeEventListener('click', specialUse);

    // Termine la partie dès qu'un score atteint 10
    if (games.scores.user == 10 || games.scores.ia == 10) {

        let result = (games.scores.user == 10) ? 1 : 0;

        endGame(result);
    }

    saveToLocalStorage();
}


// POUR CHAQUE PERSONNAGE SPECIAL OBTENU DANS LE LOCAL STORAGE, ACTIVATION LORS DE L'OUVERTURE DE LA PAGE
specialAllow();


// ACTIVE UN PERSONNAGE SPECIAL SELON CELUI QUI EST CLIQUÉ DANS LA PARTIE TRICHE
cheatCharacter.forEach(element => {
    element.addEventListener('click', specialUse)
});



export { specialSelect, specialAllow, specialObtain, specialUse };