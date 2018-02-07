import React from 'react';
import './Tile.css';

const Tile = (props) => {
    return (
        <div className={`Tile ${props.highlighted} ${props.selected}`} >
            <input
                className={`${props.dummy ? props.dummy : ''}`}
                type="tel"
                pattern="[1-9]"
                value={props.value}
                disabled={props.disabled}
                onChange={props.onChange}
                onClick={props.onClick}
                // onDoubleClick={props.onMouseLeave}
                // onMouseDown={props.disabled ? null : props.onMouseEnter}
                // onMouseLeave={props.onMouseLeave}
            />
        </div>
    );
};

export default Tile;