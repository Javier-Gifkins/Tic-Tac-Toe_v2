//NOTE - Imports:
const readlineSync = require('readline-sync');


//NOTE - Step 1: Board Representation

// a 3x3 array is used to represent the game board. The board array is a 2D array, meaning it's an array that contains other arrays as elements. Each inner array represents a horizontal row on the board.
//  Each cell will first be empty, and updated with 'X' for the player and 'O' for the AI.
let board = [
    [' ', ' ',' '], // row 0
    [' ', ' ',' '], // row 1
    [' ', ' ',' '], // row 2
]

//NOTE - Step 2: Display Current Board

function printBoard() {
    console.log("Board:");
    // this loop will run multiple times, once for each row
    for (let row of board) {
        // log the updated row and seperate each item in the 2d array with "|" 
        console.log(row.join(" | "));
        // if row is not last row, print "--+---+--" after
        if (row != board[board.length - 1]) { 
            console.log("--+---+--");
        }
    } 
}

//NOTE - Step 3: Handling Player Input

// Prompt the player to input a number between 1 and 9 to choose a position on the board.

// Function to handle the player's move
function playerMove() {

     // this stores the players chosen position on the grid
    let move; 
    
    // Loop to keep asking for input until it's given a valid move
    let validMove = false; 
    while (!validMove) {

        // prompt player for a move 
        move = parseInt(readlineSync.question("Enter a position (1-9)\n[1][2][3]\n[4][5][6]\n[7][8][9]: "));

        // Map player input to row and column. we do this by first subtracting 1
        // dividing by 3 gives us the row
        const row = Math.floor((move - 1) / 3);

        // The remainder after dividing by 3 is the column position
        const col = (move - 1) % 3;

        // Check if the move is between 1 and 9 and the space is empty
        if (move >= 1 && move <= 9 && board[row][col] === ' ') {

            // Apply the 'X' to blank space in board array
            board[row][col] = 'X'; 
            validMove = true;
        } else {
            // prompt player for another move
            console.log("Invalid move. Try again.");
        }
    }
    // Display the updated board
    printBoard();  
}


printBoard();
playerMove();

