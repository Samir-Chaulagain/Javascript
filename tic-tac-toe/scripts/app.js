const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

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

const formElement = document.querySelector('form');
const errorOutput = document.getElementById('config-error');
const startnewgamebtn = document.getElementById('startNewGame');
const activeplayerElement = document.getElementById('active-player-name');
const gameElement = document.getElementById('active-game');
const gameFieldElements = document.querySelectorAll('#game-board li');
const gameOvreElement = document.getElementById('game-over');

formElement.addEventListener('submit', savePlayerConfig);
startnewgamebtn.addEventListener('click', startnewgame);

for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectedField);
}

function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOvreElement.firstElementChild.innerHTML = 'You won <span ><strong id="winner-player-name">Player Name</strong></span>';
    gameOvreElement.style.display = "none";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
        }
    }
}

function startnewgame() {
    if (players[0].name.trim() === '' || players[1].name.trim() === '') {
        alert('Please set both players\' names');
        return;
    }

    // Reset all game board cells
    const gameBoardCells = document.querySelectorAll('#game-board li');
    gameBoardCells.forEach(cell => {
        cell.textContent = ''; // Reset cell content
        cell.classList.remove('disabled'); // Remove 'disabled' class
    });

    resetGameStatus();
    activePlayer = 0;

    // Start the game since both players' names are set
    activeplayerElement.textContent = players[activePlayer].name;
    gameElement.style.display = "block";
}

function switchplayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    activeplayerElement.textContent = players[activePlayer].name;
}

function selectedField(event) {
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');

    const selectedcol = event.target.dataset.col - 1;
    const selectedrow = event.target.dataset.row - 1;
    gameData[selectedrow][selectedcol] = activePlayer + 1;

    const winnerId = checkGameOver();

    console.log(winnerId);
    currentRound++;

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    switchplayer();
}

function checkGameOver() {
    // check row for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }
    // check column for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    // Diagonal top left to bottom right
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    // Diagonal bottom left to top right
    if (gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameOvreElement.style.display = "block";
    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOvreElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOvreElement.firstElementChild.textContent = "It's a draw!";
    }

    // Disable all game board cells after the game is over
    gameFieldElements.forEach(cell => {
        cell.classList.add('disabled');
    });
}
