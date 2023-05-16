


const userCharacters = {
    normal: [
        { 
            name: 'Yvette la Crevette', 
            src: 'public/assets/img/frame/normal/user/yvette.png', 
            alt: ''},
        { 
            name: 'Jean-Hardi l\'Emphatique', 
            src: 'public/assets/img/frame/JeanHardiFrame.png', 
            alt: ''},
        { 
            name: 'Hutin le Lutin', 
            src: 'public/assets/img/frame/HutinFrame.png', 
            alt: ''},
        { 
            name: 'Alavare l\'Opportuniste', 
            src: 'public/assets/img/frame/normal/user/alavare.png', 
            alt: ''},
        { 
            name: 'Yvres le soit-disant Druide', 
            src: 'public/assets/img/frame/normal/user/yvres.png', 
            alt: ''},
        { 
            name: 'Géhonte le Magicien de la Honte', 
            src: 'public/assets/img/frame/normal/user/gehonte.png', 
            alt: ''}
    ],
    special: [
        { 
            name: 'Austère le Drastique', 
            src: 'public/assets/img/frame/special/austere.png', 
            alt: '', 
            text: 'Vous vous tournez vers l\'archimage de Sagemine. Quoi qu\'il éprouve une répulsion manifeste de venir en aide à une bande de bras cassés, il tient à la réputation de l\'académie. Il accepte finalement de vous soutenir indirectement.', 
            effect: 'L\'adversaire perds un point !',
            audio: new Audio("./public/assets/audio/austere.mp3")},
        { 
            name: 'Charmignon',
            src: 'public/assets/img/frame/special/charmignon.png', 
            alt: '',
            text: 'Charmignon intervient', 
            effect: 'Aucun personnage spécial ne peut être utilisé par l\'ordinateur pendant deux tours !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Devine',
            src: 'public/assets/img/frame/special/devine.png', 
            alt: '', 
            text: 'Vous consultez Devine, la célèbre voyante de Sagemine. Bien que vous ne sachiez toujours pas s\'il s\'agit d\'une énième escroquerie de bonne femme, il semblerait qu\'elle ait anticipé correctement le prochain mouvement de votre adversaire !', 
            effect: 'Vous gagnez un point !',
            audio: new Audio("./public/assets/audio/devine.mp3")},
        { 
            name: 'Hontoscope',
            src: 'public/assets/img/frame/special/hontoscope.png', 
            alt: '', 
            text: 'Hontoscope intervient', 
            effect: '',
            audio: new Audio("./public/assets/audio/hontoscope.mp3")}
    ]
};

const iaCharacters = {
    normal: [
        { 
            name: 'Boulb le Homard', 
            src: 'public/assets/img/frame/normal/ia/homard.png', 
            alt: ''},
        { 
            name: 'Jean-Fonce le Sophistique', 
            src: 'public/assets/img/frame/normal/ia/jeanfonce.png', 
            alt: ''},
        { 
            name: 'Furoncle le Pesteux', 
            src: 'public/assets/img/frame/FuroncleFrame.png', 
            alt: ''},
        { 
            name: 'Pétroncle le Barbeux', 
            src: 'public/assets/img/frame/PetroncleFrame.png', 
            alt: ''},
        { 
            name: 'Licorne non binaire', 
            src: 'public/assets/img/frame/LicorneFrame.png', 
            alt: ''},
        { 
            name: 'La mascotte', 
            src: 'public/assets/img/frame/AbomineFrame.png', 
            alt: ''}
    ],
    special: [
        { 
            name: 'Abomine l\'empoisonneuse', 
            src: 'public/assets/img/frame/special/abomine.png', 
            alt: '', 
            text: 'Abomine intervient', 
            effect: 'Vous perdez un point !',
            audio: new Audio("./public/assets/audio/abomine.mp3")},
        { 
            name: 'Le porteur de lumière', 
            src: 'public/assets/img/frame/special/bouc.png', 
            alt: '', 
            text: 'Le porteur de lumière intervient', 
            effect: 'Vos personnages spéciaux sont bloqués pendant trois tours !',
            audio: new Audio("./public/assets/audio/porteur.mp3")},
        { 
            name: 'Le suppôt de Sarcophage', 
            src: 'public/assets/img/frame/special/suppot.png', 
            alt: '', 
            text: 'Le suppôt intervient', 
            effect: 'L\'ordinateur gagne un point !',
            audio: new Audio("./public/assets/audio/suppot.mp3")},
        { 
            name: 'Hontoscope', 
            src: 'public/assets/img/frame/special/hontoscope.png', 
            alt: '', 
            text: 'Hontoscope intervient', 
            effect: '',
            audio: new Audio("./public/assets/audio/hontoscope.mp3")}
    ]
};

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



export { userCharacters, iaCharacters, gameEvent, roundResults, gameOver };