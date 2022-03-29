const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

//Poner el input minimo para el dia de hoy

const hoy = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', hoy);