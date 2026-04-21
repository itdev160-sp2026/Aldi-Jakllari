console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");

// Part A: localStorage Demonstrations
console.log("\n=== LOCALSTORAGE DEMONSTRATIONS ===");

// Store a simple string
localStorage.setItem("demo-string", "Hello localStorage!");
console.log("Stored string:", localStorage.getItem("demo-string"));

// Store an object (requires JSON serialization)
const demoObject = { player: "X", score: 3, timestamp: Date.now() };
localStorage.setItem("demo-object", JSON.stringify(demoObject));
const retrievedObject = JSON.parse(localStorage.getItem("demo-object"));
console.log("Stored object:", retrievedObject);

// Clean up demo items
localStorage.removeItem("demo-string");
localStorage.removeItem("demo-object");
console.log("Demo items cleaned up");

// Part B: Game State Management
console.log("\n=== GAME STATE MANAGEMENT ===");

const STORAGE_KEY = "tictactoe-game-state";

// Game state object
let gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameActive: true,
    winner: null,
    winningCombination: null,
};

// Winning combinations (all possible ways to win)
const WINNING_COMBINATIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
];

// Initialize a new game
function initializeGame() {
    gameState = {
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: "X",
        gameActive: true,
        winner: null,
        winningCombination: null,
    };

    updateBoard();
    updateStatus();
    saveGameState();
    console.log("New game initialized");
}

// Make a move at the specified cell index
function makeMove(index) {
    // Check if move is valid
    if (!gameState.gameActive || gameState.board[index] !== "") {
        console.log(`Invalid move at index ${index}`);
        return;
    }

    // Place the current player's mark
    gameState.board[index] = gameState.currentPlayer;
    console.log(`Player ${gameState.currentPlayer} placed at position ${index}`);

    // Check for winner
    const result = checkWinner();

    if (result.winner) {
        gameState.gameActive = false;
        gameState.winner = result.winner;
        gameState.winningCombination = result.combination;
        console.log(`Game over! Winner: ${result.winner}`);
    } 
    // Check for draw
    else if (gameState.board.every((cell) => cell !== "")) {
        gameState.gameActive = false;
        console.log("Game over! It's a draw");
    } 
    // Switch players
    else {
        gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
        console.log(`Switched to player ${gameState.currentPlayer}`);
    }

    // Update UI and save state
    updateBoard();
    updateStatus();
    saveGameState();
}

// Check if there's a winner
function checkWinner() {
    for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const board = gameState.board;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], combination: combination };
        }
    }
    return { winner: null, combination: null };
}

// Part C: localStorage Integration
console.log("\n=== LOCALSTORAGE INTEGRATION ===");

// Save current game state to localStorage
function saveGameState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    console.log("Game state saved to localStorage");
}

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        gameState = JSON.parse(saved);
        console.log("Game state loaded from localStorage:", gameState);
        return true;
    }
    console.log("No saved game state found");
    return false;
}

// Part D: UI Update Functions

// Update the game board display
function updateBoard() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
        const value = gameState.board[index];

        // Set cell text content
        cell.textContent = value;
        
        // Reset classes
        cell.classList.remove("taken", "x", "o", "winning");

        // Add appropriate classes
        if (value) {
            cell.classList.add("taken");
            cell.classList.add(value.toLowerCase());
        }

        // Highlight winning cells
        if (gameState.winningCombination && gameState.winningCombination.includes(index)) {
            cell.classList.add("winning");
        }
    });
}

// Update the status message
function updateStatus() {
    const statusElement = document.getElementById("statusMessage");

    // Remove previous state classes
    statusElement.classList.remove("winner", "draw");

    if (gameState.winner) {
        statusElement.textContent = `Player ${gameState.winner} wins! 🏆`;
        statusElement.classList.add("winner");
    } else if (!gameState.gameActive) {
        statusElement.textContent = "It's a draw! 🤝";
        statusElement.classList.add("draw");
    } else {
        statusElement.textContent = `Player ${gameState.currentPlayer}'s turn`;
    }
}

// Handle cell click events
function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;

    const index = parseInt(cell.getAttribute("data-index"));
    console.log(`Cell clicked: index ${index}`);
    makeMove(index);
}

// Part E: Initialize Application
function initializeApp() {
    console.log("Initializing Tic-Tac-Toe application...");

    // Try to load saved game state
    const hasGameState = loadGameState();

    if (!hasGameState) {
        initializeGame();
    } else {
        updateBoard();
        updateStatus();
        console.log("Loaded saved game state");
    }

    // Set up event listeners
    const gameBoard = document.getElementById("gameBoard");
    const newGameBtn = document.getElementById("newGameBtn");

    gameBoard.addEventListener("click", handleCellClick);
    newGameBtn.addEventListener("click", initializeGame);

    console.log("Tic-Tac-Toe application initialized successfully!");
    console.log("Try these debugging commands in the console:");
    console.log("  - gameState (view current game state)");
    console.log("  - localStorage.getItem('tictactoe-game-state') (view saved data)");
    console.log("  - JSON.parse(localStorage.getItem('tictactoe-game-state')) (parsed saved data)");
}

// Start the application
initializeApp();