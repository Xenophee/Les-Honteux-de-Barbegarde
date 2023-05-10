


const userCharacters = {
    normal: [
        { 
            name: 'Yvette la Crevette', 
            src: 'public/assets/img/ImageFrame/YvetteFrame.png', 
            alt: ''},
        { 
            name: 'Jean-Hardi l\'Emphatique', 
            src: 'public/assets/img/ImageFrame/JeanHardiFrame.png', 
            alt: ''},
        { 
            name: 'Hutin le Lutin', 
            src: 'public/assets/img/ImageFrame/HutinFrame.png', 
            alt: ''},
        { 
            name: 'Alavare l\'Opportuniste', 
            src: 'public/assets/img/ImageFrame/AlavareFrame.png', 
            alt: ''},
        { 
            name: 'Yvres le soit-disant Druide', 
            src: 'public/assets/img/ImageFrame/YvresFrame.png', 
            alt: ''},
        { 
            name: 'Géhonte le Magicien de la Honte', 
            src: 'public/assets/img/ImageFrame/GehonteFrame.png', 
            alt: ''}
    ],
    special: [
        { 
            name: 'Austère le Drastique', 
            src: 'public/assets/img/ImageFrame/special/austere.png', 
            alt: '', 
            text: 'Austère intervient', 
            effect: 'L\'adversaire perds un point !',
            audio: new Audio("./public/assets/audio/austere.mp3")},
        { 
            name: 'Charmignon',
            src: 'public/assets/img/ImageFrame/special/charmignon.png', 
            alt: '', 
            text: 'Charmignon intervient', 
            effect: 'Aucun personnage spécial ne peut être utilisé par l\'ordinateur pendant deux tours !',
            audio: new Audio("./public/assets/audio/charmignon.mp3")},
        { 
            name: 'Devine',
            src: 'public/assets/img/ImageFrame/special/devine.png', 
            alt: '', 
            text: 'Devine intervient', 
            effect: 'Vous gagnez un point !',
            audio: new Audio("./public/assets/audio/devine.mp3")},
        { 
            name: 'Hontoscope',
            src: 'public/assets/img/ImageFrame/special/hontoscope.png', 
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
            src: 'public/assets/img/ImageFrame/HomardFrame.png', 
            alt: ''},
        { 
            name: 'Jean-Fonce le Sophistique', 
            src: 'public/assets/img/ImageFrame/JeanFonceFrame.png', 
            alt: ''},
        { 
            name: 'Furoncle le Pesteux', 
            src: 'public/assets/img/ImageFrame/FuroncleFrame.png', 
            alt: ''},
        { 
            name: 'Pétroncle le Barbeux', 
            src: 'public/assets/img/ImageFrame/PetroncleFrame.png', 
            alt: ''},
        { 
            name: 'Licorne non binaire', 
            src: 'public/assets/img/ImageFrame/LicorneFrame.png', 
            alt: ''},
        { 
            name: 'La mascotte', 
            src: 'public/assets/img/ImageFrame/AbomineFrame.png', 
            alt: ''}
    ],
    special: [
        { 
            name: 'Abomine l\'empoisonneuse', 
            src: 'public/assets/img/ImageFrame/special/abomine.png', 
            alt: '', 
            text: 'Abomine intervient', 
            effect: 'Vous perdez un point !',
            audio: new Audio("./public/assets/audio/abomine.mp3")},
        { 
            name: 'Le porteur de lumière', 
            src: 'public/assets/img/ImageFrame/special/bouc.png', 
            alt: '', 
            text: 'Le porteur de lumière intervient', 
            effect: 'Rien ne se passe pour le moment',
            audio: new Audio("./public/assets/audio/porteur.mp3")},
        { 
            name: 'Le suppôt de Sarcophage', 
            src: 'public/assets/img/ImageFrame/special/suppot.png', 
            alt: '', 
            text: 'Le suppôt intervient', 
            effect: 'L\'ordinateur gagne un point !',
            audio: new Audio("./public/assets/audio/suppot.mp3")},
        { 
            name: 'Hontoscope', 
            src: 'public/assets/img/ImageFrame/special/hontoscope.png', 
            alt: '', 
            text: 'Hontoscope intervient', 
            effect: '',
            audio: new Audio("./public/assets/audio/hontoscope.mp3")}
    ]
};

const gameEvent = [
    { 
        name: 'Sarcophage le Nécromancien', 
        src: 'public/assets/img/ImageFrame/event/sarcophage.png', 
        alt: '', 
        text: 'Sarcophage intervient', 
        effect: 'Les scores deviennent négatifs !',
        audio: new Audio("./public/assets/audio/sarcophage.mp3")},
    { 
        name: 'Barbegarde', 
        src: 'public/assets/img/ImageFrame/event/barbegarde.png', 
        alt: '', 
        text: 'Barbegarde intervient', 
        effect: 'Les scores sont divisés par deux !',
        audio: new Audio("./public/assets/audio/barbegarde.mp3")},
    { 
        name: 'Créateur', 
        src: 'public/assets/img/ImageFrame/event/createur.png', 
        alt: '', 
        text: 'Le créateur intervient', 
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
        banner: './public/assets/img/banniereD.png', 
        audio: new Audio("./public/assets/audio/defeat.mp3")},
    { 
        title: 'Victoire', 
        banner: './public/assets/img/banniereV.png', 
        audio: new Audio("./public/assets/audio/victory.mp3")},
    { 
        title: 'Egalité', 
        banner: './public/assets/img/banniereE.png', 
        audio: new Audio("./public/assets/audio/egalite.mp3")}
];



export { userCharacters, iaCharacters, gameEvent, roundResults, gameOver };