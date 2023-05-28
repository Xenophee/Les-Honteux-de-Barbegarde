
/*
================================================================================================================================================================================

Fichier contenant toutes les données nécessaires pour les changements d'affichage dans le jeu :

- Les personnages de l'utilisateur (normal & spéciaux)
- Les personnages de l'ordinateur (normal & spéciaux)
- Les personnages événements
- L'annonce du résultat de la manche et de la classe CSS correspondante
- Les bannières et audios de fin de partie

================================================================================================================================================================================
*/



// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// CONTIENT TOUTES LES DONNÉES SUR LES PERSONNAGES DE L'UTILISATEUR POUR LE FONCTIONNEMENT DU JEU
const userCharacters = {
    normal: [
        { 
            name: 'Yvette la Crevette', 
            src: 'public/assets/img/frame/normal/user/yvette.png', 
            alt: 'Petite crevette rouge orangé sur son rocher.'},
        { 
            name: 'Jean-Hardi l\'Emphatique', 
            src: 'public/assets/img/frame/normal/user/jean-hardi.png', 
            alt: 'Chevalier en armure complète noir et or.'},
        { 
            name: 'Hutin le Lutin', 
            src: 'public/assets/img/frame/HutinFrame.png', 
            alt: ''},
        { 
            name: 'Alavare l\'Opportuniste', 
            src: 'public/assets/img/frame/normal/user/alavare.png', 
            alt: 'Vieux magicien à l’air sévère dans un château.'},
        { 
            name: 'Yvres le soit-disant Druide', 
            src: 'public/assets/img/frame/normal/user/yvres.png', 
            alt: 'Vieux druide dans une forêt.'},
        { 
            name: 'Géhonte le Magicien de la Honte', 
            src: 'public/assets/img/frame/normal/user/gehonte.png', 
            alt: 'Vieux magicien barbu à lunette dans une cave.'}
    ],
    special: [
        { 
            name: 'Austère le Drastique', 
            src: 'public/assets/img/frame/special/austere.png', 
            alt: 'Vieux magicien barbu à lunette en tenue académique.', 
            text: 'Vous vous tournez vers l\'archimage de Sagemine. Quoi qu\'il éprouve une répulsion manifeste de venir en aide à une bande de bras cassés, il tient à la réputation de l\'académie. Il accepte finalement de vous soutenir indirectement.', 
            effect: 'L\'adversaire perds un point !',
            audio: new Audio("./public/assets/audio/austere.mp3")},
        { 
            name: 'Charmignon',
            src: 'public/assets/img/frame/special/charmignon.png', 
            alt: 'Bel homme brun souriant aux cheveux longs.',
            text: 'Avant même que vous ayez le temps de vous expliquer auprès de Charmignon, ce dernier vous délivre son sourire charmeur et s\'emploie déjà à altérer la perception de vos adversaires à l\'aide de ses meilleurs enchantements. Vous êtes fasciné par les talents de cet homme, mais ses victimes le sont d\'autant plus et ne semblent plus se préoccuper de quoi que ce soit d\'autre.', 
            effect: 'Aucun personnage spécial ne peut être utilisé par l\'ordinateur pendant trois tours !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Devine',
            src: 'public/assets/img/frame/special/devine.png', 
            alt: 'Vieille dame avec un chapeau de sorcière.', 
            text: 'Vous consultez Devine, la célèbre voyante de Sagemine. Bien que vous ne sachiez toujours pas s\'il s\'agit d\'une énième escroquerie de bonne femme, il semblerait qu\'elle ait parfaitement anticipé le prochain mouvement de votre adversaire !', 
            effect: 'Vous gagnez un point !',
            audio: new Audio("./public/assets/audio/devine.mp3")},
        { 
            name: 'Hontoscope',
            src: 'public/assets/img/frame/special/hontoscope.png', 
            alt: 'Petite grenouille rose poilue.', 
            text: ['Vous tentez de vous débarrasser du hontoscope qui vous colle aux ribouis en arguant que l\'équipe adverse est bien plus honteuse que la vôtre. Ses gros yeux se plissent dans une expression méfiante tandis que s\'efface son petit sourire malaisant habituel. La multiplicité des arguments que vous lui exposez ne semble pas le convaincre et finit par s\'esclaffer bruyamment. Vous rougissez de honte.',
            'Vous tentez de vous débarrasser du hontoscope qui vous colle aux ribouis en arguant que l’équipe adverse est bien plus honteuse que la vôtre. Ses gros yeux s\'écarquillent dans une expression réceptive tandis que s\'efface son petit sourire malaisant habituel. La multiplicité des arguments que vous lui exposez semble le convaincre et finit par vous lâcher pour s’accrocher à un membre de l\'équipe adverse en fredonnant le chant de la honte.'], 
            effect: ['Vous perdez deux points !', 'L\'ordinateur perd deux points !'],
            audio: new Audio("./public/assets/audio/hontoscope.mp3")}
    ]
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// CONTIENT TOUTES LES DONNÉES SUR LES PERSONNAGES DE L'ORDINATEUR POUR LE FONCTIONNEMENT DU JEU
const iaCharacters = {
    normal: [
        { 
            name: 'Boulb le Homard', 
            src: 'public/assets/img/frame/normal/ia/homard.png', 
            alt: 'Homard bleu dans son environnement naturel.'},
        { 
            name: 'Jean-Fonce le Sophistique', 
            src: 'public/assets/img/frame/normal/ia/jeanfonce.png', 
            alt: 'Chevalier brun, tête découverte, en armure verte.'},
        { 
            name: 'Furoncle le Pesteux', 
            src: 'public/assets/img/frame/normal/ia/furoncle.png', 
            alt: 'Petit troll malicieux à cornes dans la forêt.'},
        { 
            name: 'Pétroncle le Barbeux', 
            src: 'public/assets/img/frame/PetroncleFrame.png', 
            alt: ''},
        { 
            name: 'Licorne non binaire', 
            src: 'public/assets/img/frame/LicorneFrame.png', 
            alt: 'Licorne arc-en-ciel au regard noir.'},
        { 
            name: 'La mascotte', 
            src: 'public/assets/img/frame/AbomineFrame.png', 
            alt: ''}
    ],
    special: [
        { 
            name: 'Abomine l\'empoisonneuse', 
            src: 'public/assets/img/frame/special/abomine.png', 
            alt: 'Belle magicienne aux cheveux rouges dans son laboratoire.', 
            text: 'Abomine intervient', 
            effect: 'Vous perdez un point !',
            audio: new Audio("./public/assets/audio/abomine.mp3")},
        { 
            name: 'Le porteur de lumière', 
            src: 'public/assets/img/frame/special/bouc.png', 
            alt: '', 
            text: '', 
            effect: 'Vos personnages spéciaux sont bloqués pendant trois tours !',
            audio: new Audio("./public/assets/audio/porteur.mp3")},
        { 
            name: 'Le suppôt de Sarcophage', 
            src: 'public/assets/img/frame/special/suppot.png', 
            alt: '', 
            text: '', 
            effect: 'L\'ordinateur gagne un point !',
            audio: new Audio("./public/assets/audio/suppot.mp3")},
        { 
            name: 'Hontoscope', 
            src: 'public/assets/img/frame/special/hontoscope.png', 
            alt: 'Petite grenouille rose poilue.', 
            text: ['Votre adversaire tente de se débarrasser du hontoscope qui lui colle aux ribouis en arguant que votre équipe est bien plus honteuse que la sienne. Ses gros yeux se plissent dans une expression méfiante tandis que s\'efface son petit sourire malaisant habituel. La multiplicité des arguments qu’il lui expose ne semble pas le convaincre et finit par s\'esclaffer bruyamment. Votre adversaire rougit de honte.',
            'Votre adversaire tente de se débarrasser du hontoscope qui lui colle aux ribouis en arguant que votre équipe est bien plus honteuse que la sienne. Ses gros yeux s\'écarquillent dans une expression réceptive tandis que s\'efface son petit sourire malaisant habituel. La multiplicité des arguments qu’il lui expose semble le convaincre et finit par le lâcher pour s’accrocher à un membre de votre équipe en fredonnant le chant de la honte.'], 
            effect: ['L\'ordinateur perd deux points !', 'Vous perdez deux points !'],
            audio: new Audio("./public/assets/audio/hontoscope.mp3")}
    ]
};


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// CONTIENT TOUTES LES DONNÉES SUR LES ÉVÉNEMENTS DE L'UTILISATEUR POUR LE FONCTIONNEMENT DU JEU
const gameEvent = [
    { 
        name: 'Sarcophage le Nécromancien', 
        src: 'public/assets/img/frame/event/sarcophage.png', 
        alt: '', 
        text: 'La voix de Sarcophage résonne soudain sur le théâtre de la chamaillerie. Tout le monde cesse immédiatement ses activités pour se dissimuler dans le buisson le plus proche sous l\'effet d’une indicible terreur.', 
        effect: 'Les scores deviennent négatifs !',
        audio: new Audio("./public/assets/audio/sarcophage.mp3")},
    { 
        name: 'Barbegarde', 
        src: 'public/assets/img/frame/event/barbegarde.png', 
        alt: '', 
        text: 'Barbegarde intervient', 
        effect: 'Les scores sont divisés par deux !',
        audio: new Audio("./public/assets/audio/barbegarde.mp3")},
    { 
        name: 'Créateur', 
        src: 'public/assets/img/frame/event/createur.png', 
        alt: '', 
        text: 'Une chanson saugrenue s\'élève subitement dans les airs. Aucun doute, il s\'agit du créateur de l\'univers devenu complètement zinzin ! Vous êtes d\'ailleurs convaincu d’apercevoir un de ses énormes yeux scrutateurs dans le firmament.', 
        effect: 'Tous les protagonistes finissent assommés !',
        audio: new Audio("./public/assets/audio/createur.mp3")}
];


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// CONTIENT TOUTES LES DONNÉES POUR L'AFFICHAGE DU RESULTAT DE CHAQUE MANCHE
const roundResults = [
    { 
        title: 'Echec !', 
        class: 'fail'},
    { 
        title: 'Succès !', 
        class: 'success'},
    { 
        title: 'Egalité !', 
        class: 'equal'}
];


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// CONTIENT TOUTES LES DONNÉES POUR L'AFFICHAGE DE FIN DE PARTIE
const gameOver = [
    { 
        title: 'Défaite', 
        banner: './public/assets/img/others/defeat.png', 
        audio: new Audio("./public/assets/audio/defeat.mp3")},
    { 
        title: 'Victoire', 
        banner: './public/assets/img/others/victory.png', 
        audio: new Audio("./public/assets/audio/victory.mp3")},
    { 
        title: 'Egalité', 
        banner: './public/assets/img/others/equality.png', 
        audio: new Audio("./public/assets/audio/egalite.mp3")}
];


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------


export { userCharacters, iaCharacters, gameEvent, roundResults, gameOver };