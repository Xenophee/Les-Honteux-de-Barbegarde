// MUSIQUE PRINCIPALE
let mainMusic = new Audio("./public/assets/audio/Jeu.mp3");
// window.addEventListener('load', () => {
//     mainMusic.play();
//     mainMusic.volume = 0.5;
//     mainMusic.loop = true;
// })

// Sélection de blocs dans le body
let containerSelect = document.querySelector('.container');
let iconsSelect = document.querySelectorAll('.userCards>div>.containImg>img');

let userCharactersSelect = document.querySelector('.userCards');
let choiceSelect = document.querySelector('#choice>img');
let randomSelect = document.querySelector('#random>img');
let fightSelect = document.querySelector('.fight');
let show = document.querySelector('.show');
let showText = document.querySelector('.showText');
let cheater = document.querySelector('.fight>h3');
let userScore = document.querySelector('#choice>p');
let iaScore = document.querySelector('#random>p');
let victory = document.querySelector('.victory');
let equal = document.querySelector('.null');
let defeat = document.querySelector('.defeat');
let rewardDIv = document.querySelector('.reward');
let resultTry = document.querySelector('.fight h4');

// Sélection des boutons
let retry = document.getElementById('retry');
let cheat = document.getElementById('cheat');
let reward = document.getElementById('reward');
let openRules = document.getElementById('openRules');
let closeRules = document.getElementById('closeRules');


// Sélection alliés
let yvettes = document.getElementById('yvettes');
let jeanHardi = document.getElementById('jeanHardi');
let hutin = document.getElementById('hutin');
let alavare = document.getElementById('alavare');
let yvres = document.getElementById('yvres');
let gehonte = document.getElementById('gehonte');

// Sélection adversaires
let homard = document.getElementById('homard');
let furoncle = document.getElementById('furoncle');
let petroncle = document.getElementById('petroncle');
let escobar = document.getElementById('escobar');
let licorne = document.getElementById('licorne');
let vouivre = document.getElementById('vouivre');

// Initialisation des points
let userPoint = 0;
let iaPoint = 0;
let resultSelect = document.querySelector('.result');


let scream = new Audio("./public/assets/audio/bahhhhh.mp3");


// Fonction de calcul qui donne l'adversaire
function randomCalc () {
    let calc = Math.floor(Math.random()*(iconsSelect.length -1) +2)

    // En fonction du chiffre random, détermination de l'image qui va s'afficher
    switch (calc) {
        case 1 :
            randomSelect.src = "public/assets/img/ImageFrame/HomardFrame.png";
            randomSelect.title = 'Boulb le Homard';
            randomSelect.alt = homard.alt;
            break;
        case 2 :
            randomSelect.src = "public/assets/img/ImageFrame/JeanFonceFrame.png";
            randomSelect.title = 'Jean-Fonce le Sophistique';
            randomSelect.alt = escobar.alt;
            break;
        case 3 :
            randomSelect.src = "public/assets/img/ImageFrame/FuroncleFrame.png";
            randomSelect.title = 'Furoncle le Pesteux';
            randomSelect.alt = furoncle.alt;
            break;
        case 4 :
            randomSelect.src = "public/assets/img/ImageFrame/PetroncleFrame.png";
            randomSelect.title = 'Pétroncle le Barbeux';
            randomSelect.alt = petroncle.alt;
            break;
        case 5 :
            randomSelect.src = "public/assets/img/ImageFrame/LicorneFrame.png";
            randomSelect.title = 'Licorne non binaire';
            randomSelect.alt = licorne.alt;
            break;
        case 6 :
            randomSelect.src = "public/assets/img/ImageFrame/AbomineFrame.png";
            randomSelect.title = 'Abomine la Sorcière';
            randomSelect.alt = vouivre.alt;
            break;
    }

    return calc;
}


function testYvettes () {

    choiceSelect.src = "public/assets/img/ImageFrame/YvetteFrame.png";
    choiceSelect.title = 'Yvette la Crevette';
    choiceSelect.alt = yvettes.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 2 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 4 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 5 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 6 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}


function testJeanHardi () {
    
    choiceSelect.src = "public/assets/img/ImageFrame/JeanHardiFrame.png";
    choiceSelect.title = 'Jean-Hardi l\'Emphatique';
    choiceSelect.alt = jeanHardi.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 1 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 3 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 5 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 6 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}

function testHutin () {
    
    choiceSelect.src = "public/assets/img/ImageFrame/HutinFrame.png";
    choiceSelect.title = 'Hutin le Lutin';
    choiceSelect.alt = hutin.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 2 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 4 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 5 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 6 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}


function testAlavare () {
    
    choiceSelect.src = "public/assets/img/ImageFrame/AlavareFrame.png";
    choiceSelect.title = 'Alavare l\'Opportuniste';
    choiceSelect.alt = alavare.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 1 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 3 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 5 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 6 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}

function testYvres () {
    
    choiceSelect.src = "public/assets/img/ImageFrame/YvresFrame.png";
    choiceSelect.title = 'Yvres le soit-disant Druide';
    choiceSelect.alt = yvres.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 1 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 2 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 3 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 4 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}


function testGehonte () {
    
    choiceSelect.src = "public/assets/img/ImageFrame/GehonteFrame.png";
    choiceSelect.title = 'Géhonte le Magicien de la Honte';
    choiceSelect.alt = gehonte.alt;
    
    let result = randomCalc();
    console.log(`voici le résultat de la fonction ${result}`);
    
    switch (result) {
        case 1 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 2 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        case 3 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        case 4 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        default :
            userPoint = 0;
            iaPoint = 0;
            resultTry.textContent = 'Egalité !';
            fightSelect.classList.add('equal');
    }

}


// Fonction qui désactive les cartes
function desactivate () {

    let imgSelect = document.querySelectorAll('.containImg>img');
    imgSelect.forEach(element => {
    imgSelect = element.cloneNode(true);
    element.parentNode.replaceChild(imgSelect, element);
    imgSelect.classList.add('inactive');
        })
}


// Fonction qui comptabilise les points et les affiches à l'écran
function totalScore () {
    // Affiche le score
    userScore.textContent = Number(userScore.textContent) + userPoint;
    iaScore.textContent = Number(iaScore.textContent) + iaPoint;
    console.log(`Le score user est ${userScore.textContent} et le score ia est ${iaScore.textContent}`)

    // Termine la partie dès qu'un score atteint 10
    if (userScore.textContent == 10 || iaScore.textContent == 10) {
        
        desactivate();

        // Affiche le résultat de la partie
        if (userScore.textContent == 10) {
            let victorySound = new Audio("./public/assets/audio/Victory.mp3");
            mainMusic.pause();
            victorySound.play();
            victory.classList.remove('hide');
        } else if (iaScore.textContent == 10) {
            let defeatSound = new Audio("./public/assets/audio/Defeat.mp3");
            mainMusic.pause();
            defeatSound.play();
            defeat.classList.remove('hide');
        } else if (userScore.textContent == 10 && iaScore.textContent == 10) {
            let nullSound = new Audio("./public/assets/audio/Egalite.mp3");
            mainMusic.pause();
            nullSound.play();
            equal.classList.remove('hide');
        }
    }
    
}


// Permet de déclencher les tests et le score
function fight (element) {
    fightSelect.classList.remove('success');
    fightSelect.classList.remove('fail');
    fightSelect.classList.remove('equal');

    if (element.target == yvettes) {
        testYvettes();
    } else if (element.target == jeanHardi) {
        testJeanHardi();
    } else if (element.target == hutin) {
        testHutin();
    } else if (element.target == alavare) {
        testAlavare();
    } else if (element.target == yvres) {
        testYvres();
    } else {
        testGehonte();
    }

    totalScore();
}



// Déclaration des évènements

// Son sur le passage des images
iconsSelect.forEach(element => {
    element.addEventListener('mouseover', () => {
        let boing = new Audio("./public/assets/audio/Boing.mp3");
        boing.play();
    })
});

// Permet de déclencher l'affrontement
iconsSelect.forEach(element => {
    element.addEventListener('click', fight)
});


// Permet de refresh la page et de redémarrer le jeu de zéro
retry.addEventListener('click', () => {
    location.reload();
})

// Permet d'afficher la récompense
reward.addEventListener('click', () => {
    rewardDIv.classList.toggle('hide');
})

// Permet d'ouvrir la modal sur les règles du jeu et de la refermer
openRules.addEventListener('click', () => {
    let rules = document.getElementById('rules');
    rules.classList.remove('hide');
    closeRules.addEventListener('click', () => {
        rules.classList.add('hide');
    })
})



// ---------------------------------------------------------------------------------------------------------------------

// PARTIE TRICHE

let password = document.getElementById('password');
let chooseCard = document.querySelectorAll('.chooseCard>.containImg');

function cheating (event) {
    if (password.value == 'honteux' && event.key == 'Enter') {
        // Déclaration des variables utiles
        let chooseResult = document.querySelector('.chooseResult');
        let chooseCard = document.querySelector('.chooseCard');
        let chooseButton = document.querySelectorAll('.chooseResult>button');
        let chooseNull = document.getElementById('null');
        let chooseDefeat = document.getElementById('defeat');

        // Affiche les possibilités de cheat et retire le bouton cheat + l'input password
        scream.play();
        chooseResult.classList.remove('hide');
        chooseCard.classList.remove('hide');

        cheat.classList.add('hide');
        password.classList.add('hide');

        // Evènement click sur chaque bouton qui retire le visuel de l'affrontement et désactive les cartes
        chooseButton.forEach(element => {
            element.addEventListener('click', () => {
                console.log(chooseResult);
                show.classList.add('hide');
                showText.classList.add('hide');
                cheater.classList.remove('hide');
                
                desactivate();

                // Affiche la div correspondant au bouton et retire l'autre s'il y en a une
                if (element === chooseDefeat) {
                    let defeatSound = new Audio("./public/assets/audio/Defeat.mp3");
                    mainMusic.pause();
                    defeatSound.play();
                    victory.classList.add('hide');
                    equal.classList.add('hide');
                    defeat.classList.remove('hide');
                    rewardDIv.classList.add('hide');
                } else if (element === chooseNull) {
                    let nullSound = new Audio("./public/assets/audio/Egalite.mp3");
                    mainMusic.pause();
                    nullSound.play();
                    victory.classList.add('hide');
                    defeat.classList.add('hide');
                    equal.classList.remove('hide');
                    rewardDIv.classList.add('hide');
                } else {
                    let victorySound = new Audio("./public/assets/audio/Victory.mp3");
                    mainMusic.pause();
                    victorySound.play();
                    equal.classList.add('hide');
                    defeat.classList.add('hide');
                    victory.classList.remove('hide');
                }
            }) 
        })
        
    }
}

// Fonction de triche qui active des cartes spéciales
function cheatCard (card) {

    console.log(card.target);
    let austere = document.getElementById('austereCheat');
    let charmignon = document.getElementById('charmignonCheat');
    let barbegarde = document.getElementById('barbegardeCheat');
    let hontoscope = document.getElementById('hontoscopeCheat');

    if (card.target == austere) {
        let austereSound = new Audio("./public/assets/audio/Austere.mp3");
        austereSound.play();
        userScore.textContent = Number(userScore.textContent) + 1;
    } else if (card.target == charmignon  && iaScore.textContent > 0) {
        let charmignonSound = new Audio("./public/assets/audio/Charmignon.mp3");
        charmignonSound.play();
        iaScore.textContent = Number(iaScore.textContent) - 1;
    } else if (card.target == barbegarde) {
        let barbegardeSound = new Audio("./public/assets/audio/Barbegarde.mp3");
        barbegardeSound.play();
        userScore.textContent = Math.round(Number(userScore.textContent) /2);
        iaScore.textContent = Math.round(Number(iaScore.textContent) /2);
    } else if (card.target == hontoscope) {
        let hontoscopeSound = new Audio("./public/assets/audio/Hontoscope.mp3");
        hontoscopeSound.play();
        let calc = Math.floor(Math.random()*(3 -1) +1);
        console.log('le random triche est' + calc);
            if (calc == 1) {
                userScore.textContent = Number(userScore.textContent) - 2;
            } else {
                iaScore.textContent = Number(iaScore.textContent) - 2;
            }
    }
}

cheat.addEventListener('click', () => {
    password.classList.toggle('hide');
})

password.addEventListener('keypress', cheating);

chooseCard.forEach(element => {
    element.addEventListener('click', cheatCard)
});





let firstBlocUser = document.querySelector('.firstBlocUser');
let secondBlocUser = document.querySelector('.secondBlocUser');
let firstBlocUserArrow = document.getElementById('arrowDown');
let secondBlocUserArrow = document.getElementById('arrowUp');

firstBlocUserArrow.addEventListener('click', () => {
    firstBlocUser.classList.add('hide');
    firstBlocUserArrow.classList.add('hide');
    secondBlocUser.classList.remove('hide');
    secondBlocUserArrow.classList.remove('hide');
})

secondBlocUserArrow.addEventListener('click', () => {
    secondBlocUser.classList.add('hide');
    secondBlocUserArrow.classList.add('hide');
    firstBlocUser.classList.remove('hide');
    firstBlocUserArrow.classList.remove('hide');
})


let firstBlocIa = document.querySelector('.firstBlocIa');
let secondBlocIa = document.querySelector('.secondBlocIa');
let firstBlocIaArrow = document.getElementById('arrowDown2');
let secondBlocIaArrow = document.getElementById('arrowUp2');

firstBlocIaArrow.addEventListener('click', () => {
    firstBlocIa.classList.add('hide');
    firstBlocIaArrow.classList.add('hide');
    secondBlocIa.classList.remove('hide');
    secondBlocIaArrow.classList.remove('hide');
})

secondBlocIaArrow.addEventListener('click', () => {
    secondBlocIa.classList.add('hide');
    secondBlocIaArrow.classList.add('hide');
    firstBlocIa.classList.remove('hide');
    firstBlocIaArrow.classList.remove('hide');
})

