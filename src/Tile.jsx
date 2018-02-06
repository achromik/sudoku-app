import React from 'react';
import './Tile.css';

const Tile = (props) => {
    return (
        <div className="Tile">
            <input
                type="number"
                min="0"
                max="9"
                value={props.value}
                disabled={props.disabled}
                onChange={ props.onChange}
            />
        </div>
    );
};

export default Tile;