
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
    { title: 'Egalité !', class: 'equal'},
    { title: 'Succès !', class: 'success'},
    { title: 'Echec !', class: 'fail'}
];

const iconsSelect = document.querySelectorAll('.normalCharacters .character');




// DONNE L'ADVERSAIRE ALEATOIRE ET AFFICHE SON PORTRAIT
function randomCalc () {
    let calc = Math.floor(Math.random()*(iconsSelect.length));
    console.log(`Le chiffre random est ${calc}`);
    random.src = iaCharacters[calc].src;
    random.title = iaCharacters[calc].name;
    random.alt = iaCharacters[calc].alt;

    return calc;
}


// EFFECTUE LES TEST POUR CONNAITRE LE GAGNANT D'UN AFFRONTEMENT
function fight (element) {
    // fightSelect.classList.remove('success');
    // fightSelect.classList.remove('fail');
    // fightSelect.classList.remove('equal');
    let userChoice = element.target.value;
    let iaChoice = randomCalc();
    console.log(userChoice);
    console.log(`voici le résultat de la fonction ${iaChoice}`);

    choice.src = userCharacters[userChoice].src;
    choice.title = userCharacters[userChoice].name;
    choice.alt = userCharacters[userChoice].alt;

    if (element.target == yvette) {
        console.log('yvette');
    } else if (element.target == jeanHardi) {
        console.log('jeanHardi');
    } else if (element.target == hutin) {
        console.log('hutin');
    } else if (element.target == alavare) {
        console.log('alavare');
    } else if (element.target == yvres) {
        console.log('yvres');
    } else if(element.target == gehonte) {
        console.log('gehonte');
    }

    switch (userChoice) {
        // POUR YVETTE
        case 0 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        // POUR JEAN HARDI
        case 1 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        // POUR HUTIN
        case 2 :
            userPoint = 1;
            iaPoint = 0;
            resultTry.textContent = 'Succès !';
            fightSelect.classList.add('success');
            break;
        // POUR ALAVARE
        case 3 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        // POUR YVRES
        case 4 :
            userPoint = 0;
            iaPoint = 1;
            resultTry.textContent = 'Echec !';
            fightSelect.classList.add('fail');
            break;
        // POUR GEHONTE
        case 5 :
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

    // totalScore();
}



surrend.addEventListener('click', randomCalc);

// PERMET DE DECLENCHER L'AFFRONTEMENT
iconsSelect.forEach(element => {
    element.addEventListener('click', fight)
});