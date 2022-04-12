const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('loader');
// NASA API
const count = 10;
const apiKey = 'DEMO_KEY'
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM(){
    resultsArray.forEach((result) =>{
        // card container
        const card = document.createElement('div');
        card.classList.add('card');
        // link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'Ver imagen completa';
        link.target = '_blank';
        // imagen
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Foto del dia';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Guardar en favoritos
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Agregar a Favoritos'
        // Card texto
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // fecha
        const date = document.createElement('strong');
        date.textContent = result.date;
        // copyright
        const copyright = document.createElement('span');
        copyright.textContent = ` ${result.copyright}`;
        // juntarlos
        footer.append(date,copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link,cardBody);
        imagesContainer.appendChild(card);
    });
}

// obtener 10 imagenes de NASA API
async function getNasaPictures(){
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        alert(error);
    }
}

getNasaPictures();