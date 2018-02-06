import React from 'react';
import './Tile.css';

const Tile = (props) => {
    return (
        <div className={`Tile ${props.highlighted} ${props.selected}`} >
            <input
                className={`${props.dummy ? props.dummy : ''}`}
                type="number"
                min="1"
                max="9"
                value={props.value}
                disabled={props.disabled}
                onChange={ props.onChange}
                onClick={props.onClick}
            />
        </div>
    );
};

export default Tile;