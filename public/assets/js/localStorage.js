
import { userCharacters, iaCharacters, gameEvent, roundResults, gameOver } from './constants.js';

// CRÉATION DE L'OBJET DE SAUVEGARDE
let saves = {
    games: { matches: 0, victories: 0, defeats: 0, equalities: 0},
    rounds: { rounds: 0, success: 0, fail: 0, equal: 0},
    scores: { user: 0, ia: 0},
    lastCharacters: { user: null, ia: null},
    userSpecialCharacters: [false, false, false, false],
    iaSpecialCharacters: [false, false, false, false],
    event: false
};


// RECUPERATION DES INFORMATIONS DES SCORES DE L'UTILISATEUR DANS LE LOCAL STORAGE
let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : saves;


// GERE L'AFFICHAGE DES SCORES DU JEU
let displayGameStat = () => {

    if (games.lastCharacters.user != null) {
        // Affiche les images des personnages sélectionnés
        userSelection.src = userCharacters.normal[games.lastCharacters.user].src;
        userSelection.title = userCharacters.normal[games.lastCharacters.user].name;
        userSelection.alt = userCharacters.normal[games.lastCharacters.user].alt;

        iaSelection.src = iaCharacters.normal[games.lastCharacters.ia].src;
        iaSelection.title = iaCharacters.normal[games.lastCharacters.ia].name;
        iaSelection.alt = iaCharacters.normal[games.lastCharacters.ia].alt;
    }

    // Affiche le nombre de parties et de manches globales
    gamesNumber.textContent = games.games.matches;
    roundNumber.textContent = games.rounds.rounds;

    // Affiche les scores de l'utilisateur
    victoriesNumber.textContent = games.games.victories;
    equalitiessNumber.textContent = games.games.equalities;
    defeatsNumber.textContent = games.games.defeats;

    sucessNumber.textContent = games.rounds.success;
    equalNumber.textContent = games.rounds.equal;
    failNumber.textContent = games.rounds.fail;

    // Affiche les scores de l'ia
    iaVictories.textContent = games.games.defeats;
    iaEqualities.textContent = games.games.equalities;
    iaDefeats.textContent = games.games.victories;

    iaSuccess.textContent = games.rounds.fail;
    iaEqual.textContent = games.rounds.equal;
    iaFail.textContent = games.rounds.success;

    // Affiche le score de la partie en cours
    userScore.textContent = games.scores.user;
    iaScore.textContent = games.scores.ia;

}

displayGameStat();


// EFFECTUE UNE SAUVEGARDE DES SCORES DANS LE LOCAL STORAGE
let saveToLocalStorage = () => {

    // Conversion de l'objet en chaine avant de procéder à l'enregistrement
    let updateGames = JSON.stringify(games);

    // Enregistrement de la mise à jour des scores dans le localStorage
    localStorage.setItem('games', updateGames);

    // Rappel de la fonction d'affichage des scores sur le jeu
    displayGameStat();
}


// RÉINITIALISE TOUS LES SCORES À ZÉRO OU SEULEMENT LES SCORES DE LA DERNIÈRE PARTIE SELON LE BOUTON CLIQUÉ
let cleanLocalStorage = (event) => {

    let resetType = (event.target == cleanScores) ? 1 : 0;

    switch(resetType) {
        case 1:
            // Conversion de l'objet de départ avec les scores à 0
            games = saves;
            let clean = JSON.stringify(games);

            // Enregistrement du nettoyage
            localStorage.setItem('games', clean);

            // Relancement de la page pour repartir de la base
            location.reload();
            break;

        default:
            games.scores.user = 0;
            games.scores.ia = 0;
            games.rounds.rounds = 0;

            games.rounds.success = 0;
            games.rounds.equal = 0;
            games.rounds.fail = 0;

            games.lastCharacters.user = null;
            games.lastCharacters.ia = null;

            saveToLocalStorage();
    }
}


export { games, displayGameStat, saveToLocalStorage, cleanLocalStorage };