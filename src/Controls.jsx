import React from 'react';

const Controls = (props) => (
    <div className={`controls ${props.visible ? "visible" : "hidden"}`}>
        <button
            onClick={() => props.checkSudoku()}
            disabled={props.isDisabledCheckButton}
        >
            Check
        </button>
        <button
            onClick={() => props.showLevelsOption()}
        >
            New Game
        </button>
        <button
            onClick={() => props.solveGame()}
            disabled={props.isDisabledSolveButton}
        >
            Solve
        </button>
        <button
            onClick={() => props.resetGame()}
            disabled={props.isDisabledRestartButton}
        >
            Restart
        </button>
    </div>
);

export default Controls;