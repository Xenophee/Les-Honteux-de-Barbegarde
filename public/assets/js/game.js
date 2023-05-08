
// CREATION ET ENREGISTREMENT DU SCORE DE DEPART DANS LE LOCAL STORAGE
let saves = {
    games: { matches: 0, victories: 0, defeats: 0, equalities: 0},
    rounds: { rounds: 0, success: 0, fail: 0, equal: 0},
    scores: { user: 0, ia: 0},
    lastCharacters: { user: '', ia: ''}
};

// RECUPERATION DES INFORMATIONS DES SCORES DE L'UTILISATEUR DANS LE LOCAL STORAGE
let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : saves;


// MUSIQUE PRINCIPALE
let mainMusic = new Audio("./public/assets/audio/Jeu.mp3");

const userCharacters = [
    { name: 'Yvette la Crevette', src: 'public/assets/img/ImageFrame/YvetteFrame.png', alt: ''},
    { name: 'Jean-Hardi l\'Emphatique', src: 'public/assets/img/ImageFrame/JeanHardiFrame.png', alt: ''},
    { name: 'Hutin le Lutin', src: 'public/assets/img/ImageFrame/HutinFrame.png', alt: ''},
    { name: 'Alavare l\'Opportuniste', src: 'public/assets/img/ImageFrame/AlavareFrame.png', alt: ''},
    { name: 'Yvres le soit-disant Druide', src: 'public/assets/img/ImageFrame/YvresFrame.png', alt: ''},
    { name: 'Géhonte le Magicien de la Honte', src: 'public/assets/img/ImageFrame/GehonteFrame.png', alt: ''}
];

const iaCharacters = [
    { name: 'Boulb le Homard', src: 'public/assets/img/ImageFrame/HomardFrame.png', alt: ''},
    { name: 'Jean-Fonce le Sophistique', src: 'public/assets/img/ImageFrame/JeanFonceFrame.png', alt: ''},
    { name: 'Furoncle le Pesteux', src: 'public/assets/img/ImageFrame/FuroncleFrame.png', alt: ''},
    { name: 'Pétroncle le Barbeux', src: 'public/assets/img/ImageFrame/PetroncleFrame.png', alt: ''},
    { name: 'Licorne non binaire', src: 'public/assets/img/ImageFrame/LicorneFrame.png', alt: ''},
    { name: 'Abomine la Sorcière', src: 'public/assets/img/ImageFrame/AbomineFrame.png', alt: ''}
];


const roundResults = [
    { title: 'Echec !', class: 'fail'},
    { title: 'Succès !', class: 'success'},
    { title: 'Egalité !', class: 'equal'}
];

const gameOver = [
    { title: 'Défaite', banner: './public/assets/img/banniereD.png', audio: new Audio("./public/assets/audio/Defeat.mp3")},
    { title: 'Victoire', banner: './public/assets/img/banniereV.png', audio: new Audio("./public/assets/audio/Victory.mp3")},
    { title: 'Egalité', banner: './public/assets/img/banniereE.png', audio: new Audio("./public/assets/audio/Egalite.mp3")}
]

const iconsSelect = document.querySelectorAll('.normalCharacters .character input');



if (games.rounds.rounds > 0) {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');

}


// GERE L'AFFICHAGE DES SCORES DU JEU
let displayGameStat = () => {

    // Affiche les images des personnages sélectionnés
    userSelection.src = userCharacters[games.lastCharacters.user].src;
    userSelection.title = userCharacters[games.lastCharacters.user].name;
    userSelection.alt = userCharacters[games.lastCharacters.user].alt;

    iaSelection.src = iaCharacters[games.lastCharacters.ia].src;
    iaSelection.title = iaCharacters[games.lastCharacters.ia].name;
    iaSelection.alt = iaCharacters[games.lastCharacters.ia].alt;

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

// RÉINITIALISE LES SCORES DE LA DERNIERE PARTIE POUR EN COMMENCER UNE NOUVELLE
let startNewGame = () => {

    games.scores.user = 0;
    games.scores.ia = 0;
    games.rounds.rounds = 0;

    games.rounds.success = 0;
    games.rounds.equal = 0;
    games.rounds.fail = 0;

    saveToLocalStorage();
}


// RÉINITIALISE TOUS LES SCORES À ZÉRO
let cleanLocalStorage = () => {

    // Conversion de l'objet de départ avec les scores à 0
    games = saves;
    let clean = JSON.stringify(games);

    // Enregistrement du nettoyage
    localStorage.setItem('games', clean);

    // Rappel de la fonction d'affichage des scores sur le jeu
    displayGameStat();
}


// DONNE L'ADVERSAIRE ALEATOIRE ET AFFICHE SON PORTRAIT
let randomCalc = () => {
    let calc = Math.floor(Math.random()*(iconsSelect.length));
    console.log(`Le chiffre random est ${calc}`);

    return calc;
}


// EFFECTUE LES TEST POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
let battle = (element) => {

    games.lastCharacters.user = element.target.value;
    games.lastCharacters.ia = randomCalc();
    let result;
    console.log(games.lastCharacters.user);
    console.log(`voici le résultat de la fonction ${games.lastCharacters.ia}`);
    
    switch (games.lastCharacters.user) {
        // POUR YVETTE
        case '0' :
            if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 1;
            } else if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR JEAN HARDI
        case '1' :
            if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 1;
            } else if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR HUTIN
        case '2' :
            if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 1;
            } else if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR ALAVARE
        case '3' :
            if (games.lastCharacters.ia == 4 || games.lastCharacters.ia == 5) {
                result = 1;
            } else if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR YVRES
        case '4' :
            if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 1;
            } else if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR GEHONTE
        case '5' :
            if (games.lastCharacters.ia == 0 || games.lastCharacters.ia == 2) {
                result = 1;
            } else if (games.lastCharacters.ia == 1 || games.lastCharacters.ia == 3) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        default :
        result = 'non';
    }

    console.log(result);
    score(result);
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
    if (userScore.textContent == 10 || iaScore.textContent == 10) {

        mainMusic.pause();
        let result = (userScore.textContent == 10) ? 1 : 0;

        // Changement de scène avec affichage du résultat de la partie
        resultGame.classList.remove('hide');
        fightZone.classList.add('hide');

        banner.src = gameOver[result].banner;
        gameResult.textContent = gameOver[result].title;
        gameOver[result].audio.play();

        // Débloque le bouton pour la récompense en cas de victoire et met à jour les scores globaux
        if (result == 1) {
            takeReward.classList.remove('hide');
            games.games.victories += 1;
        } else {
            games.games.defeats += 1;
        }

        games.games.matches += 1;

        // Appel de la fonction de sauvegarde dans le local storage
        saveToLocalStorage();
    }
}



cleanScores.addEventListener('click', cleanLocalStorage);
restart.addEventListener('click', startNewGame);


// PERMET DE DECLENCHER L'AFFRONTEMENT
iconsSelect.forEach(element => {
    element.addEventListener('click', battle)
});


// RÉINITIALISE LES SCORES DE LA DERNIÈRE PARTIE À ZÉRO EN CAS DE FERMETURE DE LA PAGE EN FIN DE PARTIE
window.addEventListener('beforeunload', (event) => {

    if (userScore.textContent == 10 || iaScore.textContent == 10) {
        startNewGame();
    }

});