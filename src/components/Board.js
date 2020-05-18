import React, { useState } from "react";
import Square from "./Square";

export default function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setNext] = useState(true);

    const handleClick = (i) => {
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setNext(!next)
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

    const status = `Next Player: ${xIsNext ? 'X' : 'O'}`;

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