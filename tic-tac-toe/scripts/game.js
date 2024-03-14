function resetGameStatus(){
    activePlayer=0;
    currentRound=1;
    gameOvreElement.firstElementChild.inner='You won <span ><strong id="winner-player-name">Player Name</strong></span>';
    gameOvreElement.style.display="none";
for(let i=0;i<3;i++){
    for(let j=0; j<3; j++){
        gameData[i][j]=0;
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
    activeplayerElement.textContent=players[activePlayer].name;
   
    gameElement.style.display = "block";
}
function switchplayer(){
    if(activePlayer ===0){
        activePlayer=1;
    }
    else{
        activePlayer=0;
    }
    
    activeplayerElement.textContent=players[activePlayer].name;

}

function selectedField(event){
    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');
    const selectedcol=event.target.dataset.col-1;//+event.target(optional to change to mnathmetic)
    const selectedrow=event.target.dataset.row-1;//+event.target(optional to change to mnathmetic)
    gameData[selectedrow][selectedcol]=activePlayer+1;

    const winnerId= checkGameOver();

    console.log(winnerId);
    currentRound ++;
    if(winnerId!== 0){
        endGame(winnerId);
    }

    switchplayer();
}

function checkGameOver(){
    // if (gameData[0][0]===1 && gameData[0][1]===1 && gameData[0][2]===1){
    //     return 1;
    // }
    // if (gameData[0][0]===2 && gameData[0][1]===2 && gameData[0][2]===2){
    //     return 2;
    // }


    // check row for equality
    for (let i=0;i<3;i++){
        if(
            gameData[i][0]>0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2] 

        ){
            return gameData[i][0];
        }
    }
    // check column for equality
    for (let i=0;i<3;i++){
        if(
            gameData[0][i]>0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i] 

        ){
            return gameData[0][i];
        }
    }
    // Diagonal top left to bottom right
    if (gameData[0][0]>0 && 
        gameData[0][0]===gameData[1][1]&& 
        gameData[1][1]===gameData[2][2])
        {
        return gameData[0][0];
    }
    // Diagonal bottom left to top right
    if (gameData[2][0]>0 && 
        gameData[2][0]===gameData[1][1]&& 
        gameData[1][1]===gameData[0][2])
        {
        return gameData[2][0];
    }
    if (currentRound===9){
        return -1;
    }

    return 0;

}
function endGame(winnerId){
    gameOvreElement.style.display="block";
    if(winnerId>0){

        const winnerName= players[winnerId-1].name;
        gameOvreElement.firstElementChild.firstElementChild.textContent= winnerName;
    }
    else{
        gameOvreElement.firstElementChild.textContent="It's a draw!";
    }

}