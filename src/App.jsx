import { useState } from "react";

function Square({ value, onSquareClick, isMoveWinning = false }) {
  return (
    <button className={isMoveWinning ? "square square-winning" : "square"} onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  let status;
  const winnerObject = calculateWinner(squares);

  if (winnerObject) {
    status = "winner: " + winnerObject.winner;

  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const handleClick = (i) => {
    // if the square is already filled, return nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // create a copy of squares array to modify it
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(0) : false} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(1) : false} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(2) : false} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(3) : false} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(4) : false} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(5) : false} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(6) : false} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(7) : false} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isMoveWinning={winnerObject?.winningSquares ? winnerObject.winningSquares.includes(8) : false} />
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // currentMove is an index to the history array, it mean the current step we are viewing
  const [currentMove, setCurrentMove] = useState(0);
  // xIsNext can be derived from currentMove, so we don't need to store it in state
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];
  // handlePlay is called when a square is clicked, when you back to a previous move and play again, it will discard all the "future" history
  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  // all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // check if the squares at three positions are the same (and not null)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: [a, b, c]
      };
    }
  }
  // if no winner, return null, indicating the game is still ongoing
  return null;
}
