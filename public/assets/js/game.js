
// CRÉATION ET ENREGISTREMENT DES INFORMATIONS NÉCESSAIRES DANS LE LOCAL STORAGE
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


// MUSIQUE PRINCIPALE
let mainMusic = new Audio("./public/assets/audio/Jeu.mp3");

const userCharacters = {
    normal: [
        { name: 'Yvette la Crevette', src: 'public/assets/img/ImageFrame/YvetteFrame.png', alt: ''},
        { name: 'Jean-Hardi l\'Emphatique', src: 'public/assets/img/ImageFrame/JeanHardiFrame.png', alt: ''},
        { name: 'Hutin le Lutin', src: 'public/assets/img/ImageFrame/HutinFrame.png', alt: ''},
        { name: 'Alavare l\'Opportuniste', src: 'public/assets/img/ImageFrame/AlavareFrame.png', alt: ''},
        { name: 'Yvres le soit-disant Druide', src: 'public/assets/img/ImageFrame/YvresFrame.png', alt: ''},
        { name: 'Géhonte le Magicien de la Honte', src: 'public/assets/img/ImageFrame/GehonteFrame.png', alt: ''}
    ],
    special: [
        { name: 'Austère le Drastique', src: 'public/assets/img/ImageFrame/special/austere.png', alt: '', text: 'Austère intervient', effect: 'L\'adversaire perds un point !'},
        { name: 'Charmignon', src: 'public/assets/img/ImageFrame/special/charmignon.png', alt: '', text: 'Charmignon intervient', effect: 'Aucun personnage spécial ne peut être utilisé par l\'ordinateur pendant deux tours !'},
        { name: 'Devine', src: 'public/assets/img/ImageFrame/special/devine.png', alt: '', text: 'Devine intervient', effect: 'Vous gagnez un point !'},
        { name: 'Hontoscope', src: 'public/assets/img/ImageFrame/special/hontoscope.png', alt: '', text: 'Hontoscope intervient', effect: ''}
    ]
};

const iaCharacters = {
    normal: [
        { name: 'Boulb le Homard', src: 'public/assets/img/ImageFrame/HomardFrame.png', alt: ''},
        { name: 'Jean-Fonce le Sophistique', src: 'public/assets/img/ImageFrame/JeanFonceFrame.png', alt: ''},
        { name: 'Furoncle le Pesteux', src: 'public/assets/img/ImageFrame/FuroncleFrame.png', alt: ''},
        { name: 'Pétroncle le Barbeux', src: 'public/assets/img/ImageFrame/PetroncleFrame.png', alt: ''},
        { name: 'Licorne non binaire', src: 'public/assets/img/ImageFrame/LicorneFrame.png', alt: ''},
        { name: 'La mascotte', src: 'public/assets/img/ImageFrame/AbomineFrame.png', alt: ''}
    ],
    special: [
        { name: 'Abomine l\'empoisonneuse', src: 'public/assets/img/ImageFrame/special/abomine.png', alt: '', text: '', effect: ''},
        { name: 'Le porteur de lumière', src: 'public/assets/img/ImageFrame/special/bouc.png', alt: '', text: '', effect: ''},
        { name: 'Le suppôt de Sarcophage', src: 'public/assets/img/ImageFrame/special/suppot.png', alt: '', text: '', effect: ''},
        { name: 'Hontoscope', src: 'public/assets/img/ImageFrame/special/hontoscope.png', alt: '', text: '', effect: ''}
    ]
};

const gameEvent = [
    { name: 'Sarcophage le Nécromancien', src: 'public/assets/img/ImageFrame/event/sarcophage.png', alt: '', text: 'Sarcophage intervient', effect: 'Les scores deviennent négatifs !'},
    { name: 'Barbegarde', src: 'public/assets/img/ImageFrame/event/barbegarde.png', alt: '', text: 'Barbegarde intervient', effect: 'Les scores sont divisés par deux !'},
    { name: 'Créateur', src: 'public/assets/img/ImageFrame/event/createur.png', alt: '', text: 'Le créateur intervient', effect: ''}
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

const normalSelect = document.querySelectorAll('.normalCharacters .character input');
const specialSelect = document.querySelectorAll('.specialCharacters .character input');
const specialActive = document.querySelectorAll('.specialCharacters .character .active');
const chooseResult = document.querySelectorAll('.chooseResult button');
console.log(games);

if (games.rounds.rounds > 0) {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------

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


// -------------------------------------------------------------------------------------------------------------------------------------------------------

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


// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DONNE UN NOMBRE ALEATOIRE SELON LES BESOINS DU JEU
let randomNumber = (randomType, value) => {

    let Number;

    if (randomType == true) {

        Number = Math.floor(Math.random()*(value));
        console.log(`Le chiffre random est ${Number}`);

    } else {

        Number = Math.floor(Math.random() * 100) + 1;
        
    }

    return Number;
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LES EVENEMENTS ET ENREGISTRE LES EFFETS
let eventGame = () => {

    let eventType = randomNumber();
    console.log(`Le chiffre random event est ${eventType}`);

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'évènement ; on stoppe le script
    if (eventType >= 20) {
        return false;
    }

    // On relance la fonction du nombre aléatoire avec true en paramètre pour obtenir un chiffre entre 0 et 2
    eventType = randomNumber(true, gameEvent.length);
    
    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    fightZone.classList.add('hide');

    // Affiche toutes les informations relatives à l'évènement
    eventImg.title = gameEvent[eventType].name;
    eventImg.src = gameEvent[eventType].src;
    eventImg.alt = gameEvent[eventType].alt;
    eventText.textContent = gameEvent[eventType].text;
    eventEffect.textContent = gameEvent[eventType].effect;

    // Mets en place les effets de l'évènement selon son type
    switch(eventType) {
        case 0:
            games.scores.user = -games.scores.user;
            games.scores.ia = -games.scores.ia;
            break;
        case 1:
            games.scores.user = Math.round(games.scores.user /2);
            games.scores.ia = Math.round(games.scores.ia /2);
            break;
        default:
            following.addEventListener('click', () => {
                eventGameDisplay.classList.add('hide');
                resultGame.classList.remove('hide');
                fightZone.classList.add('hide');
                endGame(2);
            });
    }

    games.event = true;
    saveToLocalStorage();
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------

let specialObtain = () => {

    let specialUserType = randomNumber();
    let specialIaType = randomNumber();
    console.log(games.userSpecialCharacters);

    // Si le nombre aléatoire sorti est supérieur à 20, il n'y aura pas d'obtention de personnage spéciaux ; on stoppe le script
    if (specialUserType <= 40) {

        specialUserType = randomNumber(true, userCharacters.special.length);

        games.userSpecialCharacters[specialUserType] = true;

        specialSelect[specialUserType].classList.replace('inactive', 'active');

        specialSelect[specialUserType].addEventListener('click', specialUse);
    }

    if (specialIaType <= 40) {
        
        specialIaType = randomNumber(true, iaCharacters.special.length);

        games.iaSpecialCharacters[specialIaType] = true;
    }

    saveToLocalStorage();

}


// UTILISATION DES PERSONNAGES SPECIAUX
let specialUse = (element) => {

    console.log(element.target.value);
    let special = element.target.value;

    // Change la scène pour les évènements
    eventGameDisplay.classList.remove('hide');
    fightZone.classList.add('hide');

    // Affiche toutes les informations relatives au personnage spécial utilisé
    eventImg.title = userCharacters.special[special].name;
    eventImg.src = userCharacters.special[special].src;
    eventImg.alt = userCharacters.special[special].alt;
    eventText.textContent = userCharacters.special[special].text;
    eventEffect.textContent = userCharacters.special[special].effect;

    switch (Number(special)) {
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


// -------------------------------------------------------------------------------------------------------------------------------------------------------

// AFFICHE LE RESULTAT FINAL DE LA PARTIE ET METS A JOUR LES SCORES
let endGame = (result) => {

    // Mets la musique principale en pause
    mainMusic.pause();

    // Changement de scène avec affichage du résultat de la partie
    resultGame.classList.remove('hide');
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
        case 1:
            takeReward.classList.remove('hide');
            games.games.victories += 1;
            resultSentence.textContent = `Félicitation ! Vous avez remporté cette partie avec un score de ${games.scores.user} contre ${games.scores.ia} pour l'ordinateur.`;
        default:
            games.games.equalities += 1;
    }

    resultSentence.textContent += `La partie s'est déroulée en ${games.rounds.rounds} manches.`;
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
    if (userScore.textContent == 10 || iaScore.textContent == 10) {

        let result = (userScore.textContent == 10) ? 1 : 0;

        endGame(result);
    }
}


// -------------------------------------------------------------------------------------------------------------------------------------------------------

// EFFECTUE LES TESTS POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
let battle = (element) => {

    games.lastCharacters.user = element.target.value;
    games.lastCharacters.ia = randomNumber(true, iaCharacters.normal.length);
    let result;
    
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
    }

    // Si aucun évènement n'a encore eu lieu, on lance le script pour en faire apparaitre un potentiellement
    if (games.event === false) {
        eventGame();
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
