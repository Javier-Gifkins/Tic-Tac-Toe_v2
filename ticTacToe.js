//NOTE - Step 1: Board Representation

// a 3x3 array is used to represent the game board. The board array is a 2D array, meaning it's an array that contains other arrays as elements. Each inner array represents a horizontal row on the board.

//  Each cell will first be empty, and updated with 'X' for the player and 'O' for the AI.

let board = [
    [' ', ' ',' '],
    [' ', ' ',' '],
    [' ', ' ',' '],
]

//NOTE - Step 2: Display Current Board

function printBoard() {
    console.log("Board:");
    for (let row of board) {
        console.log(row.join(" | "));
        if (row != board[board.length - 1]) {
            console.log("--+---+--");
        }
    } 
}

printBoard()