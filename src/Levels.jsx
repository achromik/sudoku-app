import React from 'react';

const Levels = (props) => (
    <div className={`controls ${props.visible ? "visible" : "hidden"}`}>
        <button
            onClick={() => props.level(0)}
        >Easy</button>
        <button
            onClick={() => props.level(1)}
        >Medium</button>
        <button
            onClick={() => props.level(2)}
        >Hard</button>
        <button
            onClick={() => props.level(3)}
        >Very hard</button>
    </div>
);

export default Levels;