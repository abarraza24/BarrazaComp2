//Alexis Barraza
//abarraza24@cnm.edu
//JavaScript Web Programming
//Final Tic Tac Toe Game
"use strict";

// Load game elements using document and querySelector
//gameboard will be used to create gameboard
const gameBoard = document.querySelector("#gameboard");
//display messages and information to the player
const infoDisplay = document.querySelector("#info");
const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart-btn");
const scoreXDisplay = document.querySelector("#score-x");
const scoreCircleDisplay = document.querySelector("#score-circle");
const playerXNameInput = document.querySelector("#player-x-name");
const playerCircleNameInput = document.querySelector("#player-circle-name");

// Represents the board for the game using an array of empty strings
const startCells = ["", "", "", "", "", "", "", "", ""];
// Variable to track the current player
let currentPlayer = "";
// New variable to track the current symbol
let currentSymbol = "circle"; 
// Variable to track score
let scoreX = 0;
let scoreCircle = 0;

// Function to create the game board or reset the game board
function createBoard() {
    // Clear the board first before creating new cells 
    gameBoard.innerHTML = "";
    // create a total of 9 div elements and save to cell element
    startCells.forEach((cell, index) => {
        //a new div element is created and assigned the name cell element
        //represents the grid
        const cellElement = document.createElement("div");
        //Add's a "box" to newly created div and is used to style the css element.
        cellElement.classList.add("box");
        //Sets the id attribute to the current index of the iteration
        //To identify each cell by its position in the grid(0 to 8).
        cellElement.id = index;
        cellElement.addEventListener("click", play);
        //Appends the newly created cell(div) to the game board element.
        //Adds the cell to the DOM to make it visible. 
        gameBoard.append(cellElement);
    });
}

// Function to validate player names
function validatePlayerNames() {
    const playerXName = playerXNameInput.value.trim();
    const playerCircleName = playerCircleNameInput.value.trim();
    
    if (playerXName === "" || playerCircleName === "") {
        infoDisplay.textContent = "Both players must enter their names.";
        return false;
    }
    // Start with Circle
    currentPlayer = playerCircleName; 
    infoDisplay.textContent = `Game Starts with ${currentPlayer} (Circle) First.`;
    return true;
}

// Function to check the game score
function checkScore() {
    // Select all elements with the class "box" (all cells in the game board)
    const allSquares = document.querySelectorAll(".box");
    // Define the possible winning combinations of cell
    const winningCombos = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];
    // Check each winning combination for a win by the "circle" player
    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            // Check if every cell in the current combination contains a "circle" element
            allSquares[cell].firstChild?.classList.contains("circle")
        );
        if (circleWins) {
            // Increment the score for the "circle" player
            scoreCircle++;
            // Update the displayed scores
            updateScoreBoard();
            // Highlight the winning cells
            highlightWinningCells(array);
            if (scoreCircle >= 3) {
                // If the "circle" player's score is 3 or more, display them as the overall winner
                displayWinner(playerCircleNameInput.value);
            } else {
                // Otherwise, just announce the win for this round and end the game
                infoDisplay.textContent = `${playerCircleNameInput.value} (Circle) Wins!`;
                endGame();
            }
        }
    });
    // Check each winning combination for a win by the "x" player
    winningCombos.forEach(array => {
        const xWins = array.every(cell =>
            // Check if every cell in the current combination contains an "x" element
            allSquares[cell].firstChild?.classList.contains("x")
        );
        if (xWins) {
            // Increment the score for the "x" player
            scoreX++;
            // Update the displayed scores
            updateScoreBoard();
            // Highlight the winning cells
            highlightWinningCells(array);
            if (scoreX >= 3) {
                // If the "x" player's score is 3 or more, display them as the overall winner
                displayWinner(playerXNameInput.value);
            } else {
                // Otherwise, just announce the win for this round and end the game
                infoDisplay.textContent = `${playerXNameInput.value} (Cross) Wins!`;
                endGame();
            }
        }
    });
    // Check for a tie
    if ([...allSquares].every(square => square.firstChild)) {
        // If all cells have a child element, it means the board is full and it's a tie
        infoDisplay.textContent = "It's a Tie!";
        endGame();
    }
}
// Function to highlight the winning cells
function highlightWinningCells(cells) {
    cells.forEach(index => {
        const cell = document.getElementById(index);
        cell.classList.add("winning");
    });
}
//Function to display the winner who reaches 3 points first
function displayWinner(winner){
    infoDisplay.textContent = `${winner} wins the game by reaching 3 points`;
    disableBoard();
}
//Function to disable the board
function disableBoard() {
    const allSquares = document.querySelector(".box");
    allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
}
// Function to update the scoreboard
function updateScoreBoard() {
    scoreXDisplay.textContent = scoreX;
    scoreCircleDisplay.textContent = scoreCircle;
}
// Function to handle player moves
function play(e) {
    // Create a new div element to represent the player's move
    const goDisplay = document.createElement("div");
    // Add a class to the div element based on the current player's symbol (either "circle" or "x")
    goDisplay.classList.add(currentSymbol);
    // Append the div element to the clicked cell (target of the event)
    e.target.append(goDisplay);
    // Toggle the current symbol for the next move
    currentSymbol = currentSymbol === "circle" ? "x" : "circle";
    // Toggle the current player for the next move based on the current symbol
    currentPlayer = currentSymbol === "circle" ? playerCircleNameInput.value : playerXNameInput.value;
    // Update the info display to indicate whose turn it is and what their symbol is
    infoDisplay.textContent = `It is now ${currentPlayer}'s turn (${currentSymbol === "circle" ? "Circle" : "Cross"})`;
    // Remove the event listener from the clicked cell to prevent further clicks
    e.target.removeEventListener("click", play);
    // Check if the move resulted in a win or tie
    checkScore();
}

// Function to end the game
function endGame() {
    const allSquares = document.querySelectorAll(".box");
    allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
}
// Function to start the game
function startGame() {
    // Ensure players' names are validated at the start
    if (validatePlayerNames()) { 
        createBoard();
    }
}
//Function to reset the game and scores 
function resetGame() {
    //clears the board, Displays who goes first
    //Resets the scores to 0 and calls the functions updateScore and CreatedBoard. 
    gameBoard.innerHTML = "";
    infoDisplay.textContent = "Circle Goes First.";
    currentPlayer = "circle";
    scoreX = 0;
    scoreCircle = 0;
    updateScoreBoard();
    createBoard();
}
// Function to restart the game
function restartGame() {
    gameBoard.innerHTML = "";
    updateScoreBoard();
    // Ensure players' names are validated at the start
    if (validatePlayerNames()) { 
        infoDisplay.textContent = `Game Starts with ${playerCircleNameInput.value} (Circle) First.`;
        currentSymbol = "circle";
        currentPlayer = playerCircleNameInput.value;
        // Reset scores only if a player has reached 3 points
        if (scoreX >= 3 || scoreCircle >= 3) {
            scoreX = 0;
            scoreCircle = 0;
            updateScoreBoard();
        }
        createBoard();
    }
}
// Setting up event listeners for the start and restart buttons
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
// Ensure the game does not start automatically when the page loads
infoDisplay.textContent = "Enter names and click 'Start Game' to begin The Game.";
