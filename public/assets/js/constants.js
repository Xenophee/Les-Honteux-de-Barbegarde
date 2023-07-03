
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
            src: 'public/assets/img/frame/normal/user/yvette.webp', 
            alt: 'Petite crevette rouge orangé sur son rocher.'},
        { 
            name: 'Jean-Hardi l\'Emphatique', 
            src: 'public/assets/img/frame/normal/user/jeanhardi.webp', 
            alt: 'Chevalier en armure complète noir et or.'},
        { 
            name: 'Hutin le Korrigano-lutin', 
            src: 'public/assets/img/frame/normal/user/hutin.webp', 
            alt: 'Lutin mi-korrigan au regard furieux.'},
        { 
            name: 'Alavare l\'Opportuniste', 
            src: 'public/assets/img/frame/normal/user/alavare.webp', 
            alt: 'Vieux magicien à l’air sévère dans un château.'},
        { 
            name: 'Yvres le soit-disant Druide', 
            src: 'public/assets/img/frame/normal/user/yvres.webp', 
            alt: 'Vieux druide dans une forêt.'},
        { 
            name: 'Géhonte le Magicien de la Honte', 
            src: 'public/assets/img/frame/normal/user/gehonte.webp', 
            alt: 'Vieux magicien barbu à lunette dans une cave.'}
    ],
    special: [
        { 
            name: 'Austère', 
            src: 'public/assets/img/frame/special/austere.webp', 
            alt: 'Vieux magicien barbu à lunette en tenue académique.', 
            text: 'Vous vous tournez vers l\'archimage de Sagemine. Quoi qu\'il éprouve une répulsion manifeste de venir en aide à une bande de bras cassés, il tient à la réputation de l\'académie. Il accepte finalement de vous soutenir indirectement.', 
            effect: 'L\'adversaire perds un point !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Charmignon',
            src: 'public/assets/img/frame/special/charmignon.webp', 
            alt: 'Bel homme brun souriant aux cheveux longs.',
            text: 'Avant même que vous ayez le temps de vous expliquer auprès de Charmignon, ce dernier vous délivre son sourire charmeur et s\'emploie déjà à altérer la perception de vos adversaires à l\'aide de ses meilleurs enchantements. Vous êtes fasciné par les talents de cet homme, mais ses victimes le sont d\'autant plus et ne semblent plus se préoccuper de quoi que ce soit d\'autre.', 
            effect: 'Aucun personnage spécial ne peut être utilisé par l\'ordinateur pendant trois tours !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Devine',
            src: 'public/assets/img/frame/special/devine.webp', 
            alt: 'Vieille dame avec un chapeau de sorcière.', 
            text: 'Vous consultez Devine, la célèbre voyante de Sagemine. Bien que vous ne sachiez toujours pas s\'il s\'agit d\'une énième escroquerie de bonne femme, il semblerait qu\'elle ait parfaitement anticipé le prochain mouvement de votre adversaire !', 
            effect: 'Vous gagnez un point !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Hontoscope',
            src: 'public/assets/img/frame/special/hontoscope.webp', 
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
            src: 'public/assets/img/frame/normal/ia/homard.webp', 
            alt: 'Homard bleu dans son environnement naturel.'},
        { 
            name: 'Jean-Fonce le Sophistique', 
            src: 'public/assets/img/frame/normal/ia/jeanfonce.webp', 
            alt: 'Chevalier brun, tête découverte, en armure verte.'},
        { 
            name: 'Furoncle le Pesteux', 
            src: 'public/assets/img/frame/normal/ia/furoncle.webp', 
            alt: 'Petit troll malicieux à cornes dans la forêt.'},
        { 
            name: 'Pétroncle le Barbeux', 
            src: 'public/assets/img/frame/normal/ia/petroncle.webp', 
            alt: 'Grand troll vert barbu.'},
        { 
            name: 'Licorne non binaire', 
            src: 'public/assets/img/frame/normal/ia/inclusive.webp', 
            alt: 'Licorne arc-en-ciel au regard noir.'},
        { 
            name: 'Toupille le Kleptomane', 
            src: 'public/assets/img/frame/normal/ia/toupille.webp', 
            alt: 'Koala mignon en habit de voleur.'}
    ],
    special: [
        { 
            name: 'Abomine', 
            src: 'public/assets/img/frame/special/abomine.webp', 
            alt: 'Belle magicienne aux cheveux rouges dans son laboratoire.', 
            text: 'Vous vous rendez compte que trop tardivement que votre adversaire a eu recourt aux bons services d\'Abomine. Le camarade que vous aviez prévu pour le prochain duel est déjà en train de s\'étouffer en regardant le contenu de sa gourde d\'un œil suspicieux. Quelques secondes plus tard, le voilà étalé au sol, foudroyer par le sommeil, et ronflant copieusement.', 
            effect: 'Vous perdez un point !',
            audio: new Audio("./public/assets/audio/special_ia.mp3")},
        { 
            name: 'Vertuose VI', 
            src: 'public/assets/img/frame/special/vertuose.webp', 
            alt: 'Homme fée avec une couronne et des ailes de papillons', 
            text: 'Profitant du fait qu\'il soit momentanément en visite diplomatique à Barbegarde, votre adversaire demande de l\'aide au roi des fées sachant sa haine viscérale pour les Korrigans. Ni une, ni deux, lorsque son regard méprisant se posa sur Hutin, il ne fallut guère plus pour le convaincre de paralyser une partie de l\'attroupement avec une de ses attaques à base de pollen dont seules les fées ont le secret.', 
            effect: 'Vos personnages spéciaux sont bloqués pendant trois tours !',
            audio: new Audio("./public/assets/audio/special_ia.mp3")},
        { 
            name: 'Veulerine', 
            src: 'public/assets/img/frame/special/veulerine.webp', 
            alt: 'Vieil alchimiste à lunette dans son laboratoire.', 
            text: 'Le camarade que vous aviez prévu pour le prochain duel se tord subitement de douleur et s’enfuit de la scène avec une furieuse envie de se soulager aux toilettes. Vous devinez qu’il a dû consommer un des fromages moisis de Veulerine avant de venir… Vous remarquez le petit sourire en coin de votre adversaire. Est-il de connivence avec le pétochard ou s’amuse-t-il simplement de la situation ?', 
            effect: 'L\'ordinateur gagne un point !',
            audio: new Audio("./public/assets/audio/special_ia.mp3")},
        { 
            name: 'Hontoscope', 
            src: 'public/assets/img/frame/special/hontoscope.webp', 
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
        src: 'public/assets/img/frame/event/sarcophage.webp', 
        alt: 'Personnage androgyne vêtu en femme.', 
        text: 'La voix de Sarcophage résonne soudain sur le théâtre de la chamaillerie. Tout le monde cesse immédiatement ses activités pour se dissimuler dans le buisson le plus proche sous l\'effet d’une indicible terreur.', 
        effect: 'Les scores deviennent négatifs !',
        audio: new Audio("./public/assets/audio/sarcophage.mp3")},
    { 
        name: 'Barbegarde', 
        src: 'public/assets/img/frame/event/barbegarde.webp', 
        alt: 'Vieux magicien vêtu de doré.', 
        text: 'Tout en sirotant son cocktail sur la plage, Barbegarde désormais réfugié dans une région lointaine ne se lasse pas de rire en admirant le spectacle piteux qui continue de se dérouler dans la célèbre contrée qui porte son nom. Penché sur son instrument magique, il décide même d’y apporter une touche personnelle en lançant un sort sur les différents protagonistes. Subitement, ils se mettent tous à répéter à l’unisson « je suis un neu-neu ! » une bonne centaine de fois. Barbegarde rit de plus belle.', 
        effect: 'Les scores sont divisés par deux !',
        audio: new Audio("./public/assets/audio/barbegarde.mp3")},
    { 
        name: 'Créateur', 
        src: 'public/assets/img/frame/event/createur.webp', 
        alt: 'Cosmos aux mille couleurs.', 
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
        banner: './public/assets/img/others/defeat.webp', 
        audio: new Audio("./public/assets/audio/defeat.mp3")},
    { 
        title: 'Victoire', 
        banner: './public/assets/img/others/victory.webp', 
        audio: new Audio("./public/assets/audio/victory.mp3")},
    { 
        title: 'Egalité', 
        banner: './public/assets/img/others/equality.webp', 
        audio: new Audio("./public/assets/audio/egalite.mp3")}
];


// =======================================================================================================================================================
// -------------------------------------------------------------------------------------------------------------------------------------------------------


export { userCharacters, iaCharacters, gameEvent, roundResults, gameOver };