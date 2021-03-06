const boardHelper = (() => {

    const noneEmpty = function(matrix) {
        return matrix.flat().every((cell) => cell !== '' );
    }

    const allEmpty = function(row) {
        return row.every((cell) => cell === '' );
    }

    const allSame = (row) => {
        return row.every((cell) =>  row[0] === cell );
    }

    const anyEmpty = (row) =>  row.includes('') ;

    return {
        noneEmpty,
        allEmpty,
        allSame,
        anyEmpty
    };

})();


const gameBoard = (() => {
    let cells = [
        ['','',''],
        ['','',''],
        ['','','']
    ];


    const clear = () => {
        cells.map((row) => { row.map((_value,index) => row[index] = '' ) });
    }

    const setCell = (x,y, value) => {
        cells[x][y] = value;
    }
    
    const getCell = (x,y) => cells[x][y];


    // Columns == Transpose the grid.
    const columns = () => cells[0].map((cell, index) => cells.map((cell) => cell[index]));
    const primaryDiagonal = () => [[cells[0][0], cells[1][1], cells[2][2] ]];
    const secondaryDiagonal =  () => [[cells[0][2], cells[1][1], cells[2][0]]];

    const winningCombinations = function() { 
        return cells.concat(columns())
                    .concat(primaryDiagonal())
                    .concat(secondaryDiagonal());
    }
    
    const anyWinner = () => {
        for(const row of winningCombinations()) {
            if(boardHelper.allEmpty(row)) continue;
            if(boardHelper.allSame(row)) return true;
        }
        return false
    }

    // All the cells have a sign.
    const isItDraw = () => boardHelper.noneEmpty(cells);

    return {
        setCell,
        getCell,
        anyWinner,
        isItDraw,
        clear
    };

})();




const Player = (sign) => {
    return { sign };
}
let playerOne = Player('X');
let playerTwo = Player('O');


const game = ((playerOne, playerTwo) => {

    const buttons = document.querySelectorAll('.cell');
    let currentPlayer = playerOne;
    let waitingPlayer = playerTwo;


    const reset = () => {
        // 1. Remove all the button event listeners.
        disableButtons();
        clearButtons();
        // 2. Ask the gameBoard to clear its cells.
        gameBoard.clear();
    }

    const restart = () => {
        reset();
        play();
    }

    const clearButtons = () => {
        buttons.forEach((button) => {
            button.innerHTML = '';
        })
    }

    const disableButtons = () => {
        buttons.forEach((button) => {
            button.removeEventListener('click', markCell, { once: true })
        })
    }

    const switchPlayers = () => {
        [ currentPlayer, waitingPlayer ] = [ waitingPlayer, currentPlayer ];
        displayHelper.hightLightPlayer(currentPlayer);
    };


    const gameOver = function({status}) {
        disableButtons();
        displayHelper.gameOverMessage({status, sign: currentPlayer.sign })
    }

    const updateGameStatus = () => {
        const winnerExists = gameBoard.anyWinner();
        const gameIsDraw = gameBoard.isItDraw();
        console.log(winnerExists);
        if (winnerExists) {
            gameOver({status: 1});
        } else if (gameIsDraw) {
            gameOver({status: 2});
        } else {
            switchPlayers();
        }

    }


    const markCell = function(e) {
        let { x, y } = e.target.dataset;
        gameBoard.setCell(x, y, currentPlayer.sign );
        e.target.innerHTML = `${currentPlayer.sign}`;
        updateGameStatus();
    }

    const play = () => {
        buttons.forEach((button) =>  { 
            button.addEventListener('click', markCell, { once: true })
        })
    }

    return { play, restart }
})(playerOne, playerTwo);


const displayHelper = (() => {

    const playerX = document.querySelector('.x-player')
    const playerO = document.querySelector('.o-player')

    const gameOverMessage = ({status, sign}) => {
        let message;
        if (status === 1) {
            message = `It's a win for ${sign}`
        } else {
            message = "Boo it's a draw";
        }
        displayMessage(message);
        console.log(message);
    }
    
    const displayMessage = (message) => {
        let messageContainer = document.createElement('div');
        messageContainer.className = 'flash';
        messageContainer.innerText = message;
        document.body.appendChild(messageContainer);
        
        setTimeout(() => {
            messageContainer.remove();
        }, 1500);
    }

    const hightLightPlayer = (player) => {
        if (player.sign === 'X') {
            playerO.classList.remove('highlight', 'highlight--green')
            playerX.classList.add('highlight','highlight--red');
        } else {
            playerO.classList.add('highlight', 'highlight--green');
            playerX.classList.remove('highlight','highlight--red');
        }
    }

    return { gameOverMessage, hightLightPlayer }

})();


game.play();
document.querySelector('.restart').addEventListener('click', game.restart);
