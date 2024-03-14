const gameData=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
    
];
let editedPlayer = 0;
let activePlayer = 0;
let currentRound=1;

const players = [
    {
        name: ' ',
        symbol: 'X'
    },
    {
        name: "",
        symbol: 'O'
    }
];


const formElement=document.querySelector('form');
const errorOutput=document.getElementById('config-error');
const startnewgamebtn=document.getElementById('startNewGame');
const activeplayerElement=document.getElementById('active-player-name');
const gameElement=document.getElementById('active-game');
const gameFieldElementS=document.querySelectorAll('#game-board li');
const gameOvreElement=document.getElementById('game-over');



formElement.addEventListener('submit', savePlayerConfig);
startnewgamebtn.addEventListener('click', startnewgame);
for(const gameFieldElement of gameFieldElementS){
    gameFieldElement.addEventListener('click', selectedField);
}