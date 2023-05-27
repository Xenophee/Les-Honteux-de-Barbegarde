
/*
================================================================================================================================================================================

Fichier contenant l'affichage des données des personnages du jeu sous forme de cartes :

- La fonction "dataDisplay" permettant d'afficher les données souhaitées
- La fonction "changeData" permettant de supprimer l'affichage en cours et de relancer la fonction "dataDisplay"
- L'activation des boutons pour changer le contenu de la page
- L'activation de la musique de fond

================================================================================================================================================================================
*/


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// SÉLECTION DES ÉLÉMENTS DU DOM NÉCESSAIRES
const container = document.querySelector('.container');
const characters = document.querySelectorAll('.characters');


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// RÉCUPÉRATION DU PARAMÈTRE D'URL OU ATTRIBUTION D'UNE VALEUR PAR DÉFAUT
const urlParams = new URLSearchParams(window.location.search);
const urlId = (urlParams.get('id')) ? urlParams.get('id') : 2;


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// GÈRE L'AFFICHAGE DES DONNÉES DU JSON
const dataDisplay = (key) => {

    fetch('/public/assets/json/characters.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        let id = (key != undefined) ? key : urlId;
        let dataType = Object.keys(data)[id];

        data[dataType].map(function(characters, key) {

            const card = document.createElement('div');
            const img = document.createElement('img');
            const div = document.createElement('div');
            const title = document.createElement('h2');
            const secondTitle = document.createElement('h3');
            const description = document.createElement('p');

            card.classList.add('card');

            img.src = `${characters.image}`;
            img.alt = `${characters.alt}`;
            title.innerHTML = `${characters.name}`;
            secondTitle.innerHTML = `${characters.nickname}`;
            description.innerHTML = `${characters.biography}`;

            div.appendChild(title);
            div.appendChild(secondTitle);
            div.appendChild(description);
            
            card.appendChild(img);
            card.appendChild(div);

            container.appendChild(card);
        });

    });

};


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// SUPPRIME LA MISE EN PAGE DE BASE ET FAIS APPEL AU CHANGEMENT DE CONTENU
const changeData = (key) => {

    const cards = document.querySelectorAll('.card');

    cards.forEach(element => {
        container.removeChild(element);
    });
    
    dataDisplay(key);
};


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// APPEL DE LA FONCTION D'AFFICHAGE AU LANCEMENT DE LA PAGE
dataDisplay();


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// APPEL DE LA FONCTION DE CHANGEMENT D'AFFICHAGE ET CHANGE LE CONTENU EN FONCTION DU BOUTON CLIQUÉ
characters.forEach((element, key) => {
    element.addEventListener('click', () => {

        characters.forEach(element => {
            element.classList.remove('active');
        });

        element.classList.add('active');
        changeData(key);
    });
});


/* ================================================================================================================================= */
/* --------------------------------------------------------------------------------------------------------------------------------- */

// MUSIQUE DE LA PAGE
const mainMusic = new Audio("./public/assets/audio/carte.mp3");

// mainMusic.play();
// mainMusic.volume = 0.5;
// mainMusic.loop = true;