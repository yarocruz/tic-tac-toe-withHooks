import React, {useState} from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";

export default function Game() {
    const [history, setSquares] = useState(
        [{
            squares: Array(9).fill(null)
        }]
    );

    const [xIsNext, setNext] = useState(true);

    const handleClick = (i) => {
        const _history = history;
        const current = _history[_history.length - 1];
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(_history.concat([{ squares: newSquares }]));
        setNext(!xIsNext);
    }

    const _history = history;
    const current = _history[_history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>TODO</ol>
            </div>
        </div>
    )
}