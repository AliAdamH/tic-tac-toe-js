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


    const setCell = (x,y, value) => {
        cells[x][y] = value;
    }
    
    const getCell = (x,y) => cells[x][y];


    // Columns == Transpose the grid.
    const columns = cells[0].map((cell, index) => cells.map((cell) => cell[index]));
    const primaryDiagonal = [cells[0][0], cells[1][1], cells[2][2] ]
    const secondaryDiagonal = [cells[0][2], cells[1][1], cells[2][0]]

    const winningCombinations = cells
                                    .concat(columns)
                                    .concat(primaryDiagonal)
                                    .concat(secondaryDiagonal)


    
    const anyWinner = () => {
        for(const row of winningCombinations) {
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
        isItDraw
    };

})();




const Player = (sign) => {
    return { sign };
}

const game = ((playerOne, playerTwo) => {

    let currentPlayer = playerOne;
    let waitingPlayer = playerTwo;

    const switchPlayers = () => {
        [ currentPlayer, waitingPlayer ] = [ waitingPlayer, currentPlayer ];
    };


    const gameOver = function(status) {
            //does things if it's a draw
            //does other things if it's a win.
    }

    const updateGameStatus = () => {
        const winnerExists = gameBoard.anyWinner();
        const gameIsDraw = gameBoard.isItDraw();
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
        updateGameStatus();
    }

    const play = () => {
        const buttons = document.querySelectorAll('button');
        buttons.addEventListener('click', markCell, { once: true })
    }

})(playerOne, playerTwo);
