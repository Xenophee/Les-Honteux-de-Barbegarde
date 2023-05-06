
// RECUPERATION DES INFORMATIONS DES SCORES DE L'UTILISATEUR DANS LE LOCAL STORAGE OU CREATION DE L'OBJET
let games = localStorage.getItem('games') ? JSON.parse(localStorage.getItem('games')) : {
    games: { matches: 0, victories: 0, defeats: 0, equalities: 0},
    rounds: { rounds: 0, success: 0, fail: 0, equal: 0}
};

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


let displayGameStat = () => {
    gamesNumber.textContent = games.games.matches;
    victoriesNumber.textContent = games.games.victories;
    equalitiessNumber.textContent = games.games.equalities;
    defeatsNumber.textContent = games.games.defeats;

    sucessNumber.textContent = games.rounds.success;
    equalNumber.textContent = games.rounds.equal;
    failNumber.textContent = games.rounds.fail;
}

displayGameStat();

// DONNE L'ADVERSAIRE ALEATOIRE ET AFFICHE SON PORTRAIT
let randomCalc = () => {
    let calc = Math.floor(Math.random()*(iconsSelect.length));
    console.log(`Le chiffre random est ${calc}`);
    random.src = iaCharacters[calc].src;
    random.title = iaCharacters[calc].name;
    random.alt = iaCharacters[calc].alt;

    return calc;
}


// EFFECTUE LES TEST POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
let battle = (element) => {

    let userChoice = element.target.value;
    let iaChoice = randomCalc();
    let result;
    console.log(userChoice);
    console.log(`voici le résultat de la fonction ${iaChoice}`);

    choice.src = userCharacters[userChoice].src;
    choice.title = userCharacters[userChoice].name;
    choice.alt = userCharacters[userChoice].alt;

    switch (userChoice) {
        // POUR YVETTE
        case '0' :
            if (iaChoice == 1 || iaChoice == 3) {
                result = 1;
            } else if (iaChoice == 4 || iaChoice == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR JEAN HARDI
        case '1' :
            if (iaChoice == 4 || iaChoice == 5) {
                result = 1;
            } else if (iaChoice == 0 || iaChoice == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR HUTIN
        case '2' :
            if (iaChoice == 1 || iaChoice == 3) {
                result = 1;
            } else if (iaChoice == 4 || iaChoice == 5) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR ALAVARE
        case '3' :
            if (iaChoice == 4 || iaChoice == 5) {
                result = 1;
            } else if (iaChoice == 0 || iaChoice == 2) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR YVRES
        case '4' :
            if (iaChoice == 0 || iaChoice == 2) {
                result = 1;
            } else if (iaChoice == 1 || iaChoice == 3) {
                result = 0;
            } else {
                result = 2;
            }
            break;
        // POUR GEHONTE
        case '5' :
            if (iaChoice == 0 || iaChoice == 2) {
                result = 1;
            } else if (iaChoice == 1 || iaChoice == 3) {
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
            userScore.textContent = Number(userScore.textContent) + 1;
            break;
        case 0 :
            iaScore.textContent = Number(iaScore.textContent) + 1;
            break;
    }

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

        // Débloque le bouton pour la récompense en cas de victoire
        if (result == 1) {
            takeReward.classList.remove('hide');
        }
    }
}



// PERMET DE DECLENCHER L'AFFRONTEMENT
iconsSelect.forEach(element => {
    element.addEventListener('click', battle)
});