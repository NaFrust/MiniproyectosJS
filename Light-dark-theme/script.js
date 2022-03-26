const toogleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toogleIcon = document.getElementById('toogle-icon');
const imagen1 = document.getElementById('imagen1');
const imagen2 = document.getElementById('imagen2');
const imagen3 = document.getElementById('imagen3');
const textBox = document.getElementById('text-box');


function imageMode(color){
    imagen1.src = `img/undraw_proud_coder_${color}.svg`;
    imagen2.src = `img/undraw_feeling_proud_${color}.svg`;
    imagen3.src = `img/undraw_conceptual_idea_${color}.svg`;
}




function toggleDarkLightMode(isDark){
    nav.style.backgroundColor = isDark? 'rgb( 0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark? 'rgb(255 255 255 / 50%)': 'rgb( 0 0 0 / 50%)';
    toogleIcon.children[0].textContent = isDark? 'Modo Nocturno': 'Modo Diurno';
    isDark? toogleIcon.children[1].classList.replace('fa-sun','fa-moon') : toogleIcon.children[1].classList.replace('fa-moon','fa-sun');
    isDark? imageMode('dark'):imageMode('light');

}



function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark');
        toggleDarkLightMode(true);
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme','light');
        toggleDarkLightMode(false); 
    }
}


toogleSwitch.addEventListener('change', switchTheme);


//revisa local storage
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'dark'){
        toogleSwitch.checked = true;
        toggleDarkLightMode(true);

    }
}