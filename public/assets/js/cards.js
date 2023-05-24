
const mainMusic = new Audio("./public/assets/audio/Carte.mp3");

// mainMusic.play();
// mainMusic.volume = 0.5;
// mainMusic.loop = true;


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);



fetch('/public/assets/json/characters.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        // console.log(data.user);

        let dataType = Object.keys(data)[id];

        data[dataType].map(function(characters, key) {

            // console.log(key, characters);

            const container = document.querySelector('.container');
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