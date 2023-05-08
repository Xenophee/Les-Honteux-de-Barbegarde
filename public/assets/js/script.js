


// OUVERTURE DES REGLES DU JEU
openRules.addEventListener('click', () => {
    rules.showModal();
});

// FERMETURE DES REGLES DU JEU
closeRules.addEventListener('click', () => {
    rules.close();
});

// AFFICHAGE DE L'ARENE POUR DEMARRER UNE PARTIE
startGame.addEventListener('click', () => {
    noGameStart.classList.add('hide');
    fightZone.classList.remove('hide');
})

// AFFICHE LA RECOMPENSE EN CAS DE VICTOIRE
takeReward.addEventListener('click', () => {
    takeReward.classList.add('hide');
    gameResultBloc.classList.add('hide');
    reward.classList.remove('hide');
})

// REAFFICHAGE DE L'ARENE POUR REFAIRE UNE PARTIE
restart.addEventListener('click', () => {
    resultGame.classList.add('hide');
    fightZone.classList.remove('hide');
});


// AFFICHE L'INPUT POUR LE MOT DE PASSE
cheat.addEventListener('click', () => {
    passwordSection.classList.toggle('hide');
});

// FERME L'ONGLET DE TRICHE
closeCheat.addEventListener('click', () => {
    choosingCheat.classList.add('hide');
    cheatingEnter.classList.remove('hide');
});

// AFFICHE LA SECTION DE TRICHE
password.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && password.value == 'honteux') {
        cheatingEnter.classList.add('hide');
        passwordSection.classList.add('hide');
        choosingCheat.classList.remove('hide');
    }
});