const imagen = document.querySelector('img');
const titulo = document.getElementById('title');
const artista = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Musica
const canciones = [
    {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Metric / Jacinto Design',
    },
]

//revisar si esta reproduciendose
let isPlaying = false;

// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','Pausar');
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Reproducir');
    music.pause();
}


playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()));

//UpdateDom
function loadSong(cancion){
    titulo.textContent =  cancion.displayName;
    artista.textContent = cancion.artist;
    music.src = `music/${cancion.name}.mp3`;
    imagen.src = `img/${cancion.name}.jpg`; 

}

//current Song
let songIndex = 0;

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = canciones.length -1;
    }
    loadSong(canciones[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > canciones.length -1){
        songIndex = 0;
    }
    loadSong(canciones[songIndex]);
    playSong();
}

//on load

loadSong(canciones[songIndex]);

function updateProgressBar(event){
    if(isPlaying){
        const {duration, currentTime} = event.srcElement;
        //actualizar el ancho del progress bar
        const porcentajeProgreso = (currentTime/duration)* 100;
        progress.style.width = `${porcentajeProgreso}%`;
        //calcular la duracion
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds <10){
            durationSeconds = `0${durationSeconds}`
        }
        
        //delay al cambiar la duracion para evitar un NaN
        if(durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //calcular el tiempo actual
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds <10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

//Event Listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar) ;
progressContainer.addEventListener('click', setProgressBar);


