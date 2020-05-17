import React from "react";
import Square from "./Square";

export default function Board() {
    const renderSquare = (i) => {
        return <Square />
    }

    const status = 'Next Player: X';

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