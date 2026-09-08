
console.log("START JS");

const board = document.getElementById("board");
let announce = document.querySelector(".announce");
let gameLogs = document.querySelector(".gameLogs");
const audioTick = new Audio("media/tick.mp3");

let gameOver = false;

let cellToOverwrite = 2; /* logic imply those must be 2 and 1 for a good start */
let cellToOverwriteIncrement = 1;

class Player {
    name;
    buffer;
    constructor(name){
        this.name = name;
        this.buffer = [" "," "," "];
    }

    checkWin(){
        let sortedBuff = this.buffer.toSorted();
        return ((sortedBuff[0]+1) == sortedBuff[1]) && ((sortedBuff[1]+1) == sortedBuff[2]);
    }
}

const playerA = new Player("A");
const playerB = new Player("B");

let currentPlayer = playerA;


function switchPlayer(){
    if(currentPlayer.name === "A") currentPlayer = playerB;
    else currentPlayer = playerA;
}

function isFault(number){
    return (playerA.buffer.includes(number)) || (playerB.buffer.includes(number));
}


function handleClick(event) {
    if(gameOver) return;

    const cell = event.target; /* je recup la target du clic */
    if(!cell.classList.contains("cell")) return; /* test si c'est bien une cell */

    audioTick.play();

    cellToOverwrite = (cellToOverwrite + cellToOverwriteIncrement) % 3;
    cellToOverwriteIncrement = (cellToOverwriteIncrement + 1) % 2;

    let playedNumber = Number(cell.textContent);

    if(isFault(playedNumber)){
        announce.textContent = `FAULT : ${currentPlayer.name} played ${playedNumber}`;
        gameLogs.textContent = `${playerA.name} had [${playerA.buffer}], ${playerB.name} had [${playerB.buffer}]`;

        gameOver = true;
        return;
    }

    currentPlayer.buffer[cellToOverwrite] = playedNumber;
    console.log(currentPlayer.name + " plays " + playedNumber + " and have " + currentPlayer.buffer);
    

    if(currentPlayer.checkWin()){
        console.log("Win of " + currentPlayer.name);
        announce.textContent = currentPlayer.name + " wins !"
        gameLogs.textContent = `${playerA.name} have [${playerA.buffer}], ${playerB.name} have [${playerB.buffer}]`;
        gameOver = true;
    } else {
        switchPlayer();
        announce.textContent = currentPlayer.name + " is playing..."
    }    
}
board.addEventListener("click",handleClick)