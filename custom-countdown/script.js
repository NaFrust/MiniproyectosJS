const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitulo = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const tiempoElements = document.querySelectorAll('span');

const completoEl = document.getElementById('complete');
const completoElInfo = document.getElementById('complete-info');
const completoBtn = document.getElementById('complete-button');

let countdownTitle ='';
let countdownFecha ='';
let countdownValor = new Date();
let countdownActive;
let savedCountdown;

const segundo = 1000;
const minuto = segundo * 60;
const hora = minuto * 60;
const dia = hora * 24;

//Poner el input minimo para el dia de hoy

const hoy = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', hoy);

function updateDOM(){
   countdownActive = setInterval(()=>{
    const ahora = new Date().getTime();
    const distancia = countdownValor - ahora;
    
    const dias = Math.floor(distancia/dia);
    const horas = Math.floor((distancia % dia)/hora);
    const minutos = Math.floor((distancia % hora)/minuto);
    const segundos = Math.floor((distancia % minuto)/segundo);
      //esconder input
    inputContainer.hidden = true;
    if(distancia < 0){
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completoElInfo.textContent = `${countdownTitle} termino el ${countdownFecha}`;
        completoEl.hidden = false;
    }else{
        countdownElTitulo.textContent = `${countdownTitle}`;
        tiempoElements[0].textContent = `${dias}`;
        tiempoElements[1].textContent = `${horas}`;
        tiempoElements[2].textContent = `${minutos}`;
        tiempoElements[3].textContent = `${segundos}`;
        completoEl.hidden = true;
        countdownEl.hidden = false;
    }    
   },segundo);

}



function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownFecha = e.srcElement[1].value;
    //Obtener la fecha
    savedCountdown ={
        titulo: countdownTitle,
        fecha: countdownFecha,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    if(countdownFecha === ''){
        alert('por favor seleccionar una fecha')
    }else{
        countdownValor = new Date(countdownFecha).getTime();
        updateDOM();
    }
  

}
//reiniciar todos los valores
function reiniciar(){
    countdownEl.hidden = true;
    completoEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownFecha = '';   
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.titulo;
        countdownFecha = savedCountdown.fecha;
        countdownValor = new Date(countdownFecha).getTime();
        updateDOM();

    }
}


//event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reiniciar);
completoBtn.addEventListener('click',reiniciar);

restorePreviousCountdown();