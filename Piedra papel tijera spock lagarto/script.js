const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('result');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// Reset todos los iconos seleccionados
function resetSelected(){
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
}

// pasando player seleccion

function select(playerChoice){
  resetSelected();
  // agregar style 
  switch(playerChoice){
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent =' --- Piedra';
      break;
    case 'paper':
        playerPaper.classList.add('selected');
        playerChoiceEl.textContent =' --- Papel';
        break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent =' --- Tijera';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent =' --- Lagarto';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent =' --- Spock';
      break;
    default:
      break;
    
  }
}

