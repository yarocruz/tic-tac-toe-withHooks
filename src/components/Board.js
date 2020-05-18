import React, { useState } from "react";
import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

export default function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setNext] = useState(true);

    const handleClick = (i) => {
        const newSquares = squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setNext(!xIsNext)
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div>
            <h2 className="status">{status}</h2>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}