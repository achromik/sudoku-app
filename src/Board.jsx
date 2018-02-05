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
        // console.log(this.props.sudoku.slice(''));
        return (
            <div className="Board">
                {
                    console.log(this.props.sudoku)}{
                    Array.from(this.props.sudoku).map((item, index) =>
                        <Tile
                            key={index}
                            id={index}
                            value={item}
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