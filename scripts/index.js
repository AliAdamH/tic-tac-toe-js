const boardHelper = (() => {

    const noneEmpty = function(matrix) {
        return matrix.flat().every((cell) => cell !== '' );
    }

    const allEmpty = function(matrix) {
        return matrix.flat().every((cell) =>cell === '' );
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



    const columns = cells[0].map((cell, index) => cells.map((cell) => cell[index]));
    const primaryDiagonal = [cells[0][0], cells[1][1], cells[2][2] ]
    const secondaryDiagonal = [cells[0][2], cells[1][1], cells[2][0]]

    const winningCombinations = cells
                                    .concat(columns)
                                    .concat(primaryDiagonal)
                                    .concat(secondaryDiagonal)

    return {
        setCell,
        getCell
    };

})();




const Player = (sign) => {
    return { sign };
}

const game = (() => {
    const switchPlayers = () => {
        [ currentPlayer, waitingPlayer ]= [ waitingPlayer, currentPlayer ];
    };

    const play = () => {

    }
})(playerOne, playerTwo);
