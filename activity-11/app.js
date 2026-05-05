// Square component - represents a single button on the board
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

// Board component - renders the 3x3 game board
function Board({ xIsNext, squares, onPlay }) {
    
    function handleClick(i) {
        // If square already has a value or there's a winner, don't allow move
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        
        // Create a copy of the squares array (immutability)
        const nextSquares = squares.slice();
        
        // Place X or O based on whose turn it is
        nextSquares[i] = xIsNext ? "X" : "O";
        
        // Notify parent component of the move
        onPlay(nextSquares);
    }
    
    // Check if there's a winner
    const winner = calculateWinner(squares);
    let status;
    
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

// Game component - manages game state and history (time travel)
function Game() {
    // State for game history (array of board states)
    const [history, setHistory] = React.useState([Array(9).fill(null)]);
    
    // State for current move number
    const [currentMove, setCurrentMove] = React.useState(0);
    
    // Calculate whose turn it is based on move number
    const xIsNext = currentMove % 2 === 0;
    
    // Get the current board state from history
    const currentSquares = history[currentMove];
    
    // Handle a move being made
    function handlePlay(nextSquares) {
        // Create new history by taking all moves up to current move + new move
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    
    // Jump to a specific move in history (time travel)
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }
    
    // Create list of move buttons for time travel
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button 
                    className={move === currentMove ? "current-move" : ""}
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        );
    });
    
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <h2>Move History</h2>
                <ul className="moves-list">{moves}</ul>
            </div>
        </div>
    );
}

// Helper function to calculate winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top left to bottom right
        [2, 4, 6], // Diagonal top right to bottom left
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Render the Game component to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);