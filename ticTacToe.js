//NOTE - Imports:
const readlineSync = require('readline-sync');

//NOTE - Step 1: Board Representation

// a 3x3 array is used to represent the game board. The board array is a 2D array, meaning it's an array that contains other arrays as elements. Each inner array represents a horizontal row on the board.
//  Each cell will first be empty, and updated with 'X' for the player and 'O' for Player 2 or the AI.
let board = [
    [' ', ' ',' '], // row 0
    [' ', ' ',' '], // row 1
    [' ', ' ',' '], // row 2
]

//NOTE - Step 2: Display Current Board

// function to console.log the updated game board
function printBoard() {
    console.log("Board:");
    // this loop will run multiple times, once for each row
    for (let row of board) {
        // log the updated row and while seperating each item in the 2d array with "|" 
        console.log(row.join(" | "));
        // if row is not last row, print "--+---+--" after
        if (row != board[board.length - 1]) { 
            console.log("--+---+--");
        }
    } 
}

//NOTE - Step 3: Handling Player Input

// Player move function
function playerMove(symbol) {
    // the variable "move" stores the players chosen position on the grid
    let move; 
    // Loop to keep asking for input until it's given a valid move
    let validMove = false; 
    while (!validMove) {
        // Prompt the player to input a number between 1 and 9 to choose a position on the board.
        move = parseInt(readlineSync.question(`Player ${symbol}, enter a position (1-9)\n[1][2][3]\n[4][5][6]\n[7][8][9]: `));
        // Map player input to row and column/row. we do this by first subtracting 1 because the actual array goes from 0 to 8. 
        // dividing by 3 gives us the row
        const row = Math.floor((move - 1) / 3);
        // The remainder after dividing by 3 is the column position
        const col = (move - 1) % 3;
        // Check if the move is between 1 and 9 and the space is empty
        if (move >= 1 && move <= 9 && board[row][col] === ' ') {
            // Apply the Symbol to blank space in board array
            board[row][col] = symbol; 
            validMove = true;
        } else {
            // prompt player for another move
            console.log("Invalid move. Try again.");
        }
    }
    // clear console of previous round for clarity
    console.clear();
    // Display the updated board
    printBoard();  
}

//function oldPlayerMove() {
//     let move; 
//     let validMove = false; 
//     while (!validMove) {
//         move = parseInt(readlineSync.question("Enter a position (1-9)\n[1][2][3]\n[4][5][6]\n[7][8][9]: "));
//         const row = Math.floor((move - 1) / 3);
//         const col = (move - 1) % 3;
//         if (move >= 1 && move <= 9 && board[row][col] === ' ') {
//             board[row][col] = 'X'; 
//             validMove = true;
//         } else {
//             console.log("Invalid move. Try again.");
//         }
//     }
//     console.clear();
//     printBoard();  
// }

//NOTE - Step 3: AI Functionality

// AI logic
function aiMove() {
    // let row/column is scoped to this aiMove() function
    let row, column;

    // Check if the center position (5) is available
    if (board[1][1] === ' ') {
        row = 1;   // Set row as 1 (middle row)
        column = 1; // Set column as 1 (middle column)
    }
    // Step 2: Check for the first available corner (positions 1, 3, 7, 9)
    else if (board[0][0] === ' ') {  // Top-left corner
        row = 0;
        column = 0;
    } else if (board[0][2] === ' ') {  // Top-right corner
        row = 0;
        column = 2;
    } else if (board[2][0] === ' ') {  // Bottom-left corner
        row = 2;
        column = 0;
    } else if (board[2][2] === ' ') {  // Bottom-right corner
        row = 2;
        column = 2;
    }
    // Step 3: If no corners available, take any available edge positions (2, 4, 6, 8)
    else {
        // Start a loop over all rows of the board (r)
        for (let r = 0; r < 3; r++) {
            // For each row, start a loop over all columns (c)
            for (let c = 0; c < 3; c++) {
                // Check if the spot is empty and is not a corner or center
                if (board[r][c] === ' ' && (r === 0 || r === 2 || c === 0 || c === 2)) {
                    // a valid move was found, so we save the row/column
                    row = r;
                    column = c;
                    // then we break inner loop (columns)
                    break;
                }
            }
            // If a valid move has been found, exit the loop
            if (row !== undefined && column !== undefined) break;
        }
    }
    // Apply the 'O' to the saved position
    board[row][column] = 'O';
    // clear console of previous round
    console.clear();
    // Display the updated board after AI's move
    printBoard();
}

//NOTE - Step 4: Win Check Function

// this function will check if either player has won, when the function is called later it will check if three of the same symbols are in a line.
function checkWin(symbol) {
    // loop through for each row starting at 0 and below 3
    for (let i = 0; i < 3; i++) {
        // i acts as an index when checking rows and columns. In the board, this [i][2] functions like grid coordinates. 'i' is like the Y-axis (row) and 2 is the X-axis (column) 

        // this is checking rows for 3 of the same symbol
        if (board [i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true;
        // this is checking columns for 3 of the same symbol
        if (board [0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true;
    }
    // Checking Diagonals 
    // the same coordinate logic is used
    if (board[0][0] === symbol && board [1][1] === symbol && board [2][2] === symbol) return true;
    if (board[0][2] === symbol && board [1][1] === symbol && board [2][0] === symbol) return true;
    // if win condition not met the loop breaks and we continue playing
    return false
}

//NOTE - Step:5 Checking for Draws

// This function will check if the board is full
function isDraw() {
    // iterate through every row in board 
    for (let row of board) {
        // row contains a space return false
        if (row.includes(" ")) return false;
    }
    // otherwise return true
    return true
}

//NOTE - Step 6: Game Loop

function playGame() {
    // clear console of previous round
    console.clear();
    // reset and display the board each start of a round
    board = [
        [' ', ' ',' '], // row 0
        [' ', ' ',' '], // row 1
        [' ', ' ',' '], // row 2
    ];
    printBoard();

    // a prompt for 1 or 2 player
    let gameplaymode = (readlineSync.question("\nDo you have any friends to play with? [Y/N] "))

    // enter 1 player mode
    if (gameplaymode.toLowerCase() === "n") {
        // 1 player mode confirmation
        console.log("Oh thats a shame, dont worry i'll play a game with you =)\n");
        // entering an infinite loop until a win or a draw has been identified
        while(true) {
            // after each player move, the checkwin function and the isdraw function are called
            playerMove("X");
            if (checkWin("X")) {
                console.log("You Win Hurray! ");
                break;
            }
            if (isDraw()) {
                console.log("Its a Draw. ");
                // if either return true, the loop breaks
                break;
            }
            // after each AI move, the checkwin function and the draw function are called
            aiMove();
            if (checkWin("O")) {
                console.log("Naughty Wins, Better Luck Next Time. ");
                break;
            }
            if (isDraw()) {
                console.log("Its a Draw. ");
                // if either return true, the loop breaks
                break;
            }
        }
    } else if (gameplaymode.toLowerCase() === "y") {
        // 2 player mode confirmation
        console.log("Thats good news, enjoy your game together <3\n");
        // variable current player is created & assigned to player 1, it is block scoped
        let currentPlayer = "X"; // Start with Player 1
        // entering an infinite loop until a win or a draw has been identified
        while (true) {
        // currentPlayer is the parameter being passed to the playerMove function.
        playerMove(currentPlayer); 
        // currentPlayer is the parameter being passed to the function checkwin.
        if (checkWin(currentPlayer)) {
            // this is a template string, or template literal, its a formatted string that can convert different different dta types like numbers, booleans, and objects and console log them in their string representation, very cool.
            console.log(`Player ${currentPlayer} wins!`);
            break;
        }
        if (isDraw()) {
            console.log("It's a Draw.");
            break;
        }
        // Switch player after every turn
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
    }
}

    // After main loop ends, ask to play again
    const again = readlineSync.question("\nWould You Like to Play Again? [Y/N] ");
    if (again.toLowerCase() === "y") {
        // if "Y" is typed it restarts the playGame function
        playGame();
    } else {
        // if "N" is typed the game ends
        console.log("\nThanks For Playing! ")
    }
}

// Call playGame function, which in turn calls every other function to create a cohesive tic tac toe game.
playGame();

