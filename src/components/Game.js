import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "../utils/calculateWinner";

export default function Game() {
    const [history, setSquares] = useState(
        [{
            squares: Array(9).fill(null)
        }]
    );
    const [xIsNext, setNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    const jumpTo = (step) => {
        setStepNumber(step);
        setNext((step % 2) === 0);
    }

    const setMove = (i) => {
        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }

        newSquares[i] = 'X';
        setSquares(_history.concat([{ squares: newSquares }]));
        setStepNumber(_history.length)
        setNext(!xIsNext);

        setTimeout(() => {
            computerMove(newSquares, _history);
        }, 500);
    }

    const computerMove = (s, h) => {
        // select a random index in a array that is not null
        h = history.slice(0, stepNumber + 1);
        console.log(h)
        const squareIndexes = Array.from(Array(s.length).keys());
        const availableSquares = squareIndexes.filter(index => s[index] === null);
        const selectedIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)]
        if (calculateWinner(s) || s[selectedIndex]) {
            return;
        }
        s[selectedIndex] = 'O';
        setSquares(h.concat([{ squares: s }]));
        setStepNumber(h.length)
        setNext(!xIsNext);
        console.log(availableSquares);
        console.log(selectedIndex);
    }

    const handleClick = (i) => {
        setMove(i)

    }


    const _history = history;
    const current = _history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = _history.map((step, move) => {
        const desc = move ? `Go to move # ${move}` : `Go to game start`;
        return <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    })

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    }
    else {
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
                <ol>{moves}</ol>
            </div>
        </div>
    )
}