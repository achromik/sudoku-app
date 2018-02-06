import React, { Component } from 'react';
import Tile from './Tile.jsx';

import './Board.css';


class Board extends Component {
    constructor(props) {
        super(props);

        this.isInitialNumber = this.isInitialNumber.bind(this);
    }

    isInitialNumber(index, item) {
        return (item === this.props.initialBoard.substr(index, 1) && item !== '.')
            ? true
            : false;
    }


    render() {
        return (
            <div className="Board"
                onClick={this.props.onClick}>
                {
                    Array.from(this.props.sudoku).map((item, index) =>
                        <Tile
                            key={index}
                            id={index}
                            value={item === '.' ? '' : item}
                            disabled={this.isInitialNumber(index, item)}
                            onChange={(e) => this.props.onChange(index, e.target.value)}
                        />
                    )
                }
            </div>
        );
    }
}

export default Board;