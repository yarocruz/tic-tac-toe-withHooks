import React, { useState, useEffect } from "react";
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

    }

    const computerMove = () => {

        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const newSquares = current.squares.slice();

        // select a random index in a array that is not null
        const squareIndexes = Array.from(Array(newSquares.length).keys());
       // This part guarantees that every time the array of keys shrinks, we only get the indexes left that are not null
       // so when the Math.random does is thing, it will only select from those available squares.
        const availableSquares = squareIndexes.filter(index => newSquares[index] === null);
        const selectedIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)]
        if (calculateWinner(newSquares) || newSquares[selectedIndex]) {
            return;
        }
        newSquares[selectedIndex] = 'O';
        setSquares(_history.concat([{ squares: newSquares }]));
        setStepNumber(_history.length)
        setNext(true);
    }

    const handleClick = (i) => {
        setMove(i);
    }

    useEffect(() => {
        if (!xIsNext) { // once xIsNext is no longer true, computerMove() gets called as a side effect in half a second.
            setTimeout(() => {
                computerMove()
                setNext(true);
            }, 500)
        }
    }, [xIsNext])


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