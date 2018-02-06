import React, { Component } from 'react';
import Tile from './Tile.jsx';

import './Board.css';


class Board extends Component {
    isInitialNumber(index, item) {
        return (item === this.props.initialBoard.substr(index, 1) && item !== '.')
            ? true
            : false;
    }

    isHighlighted(index, selectedTile) {
        if (
            //if it is the same square
            (Math.floor(index / 3) % 3 + Math.floor(index / 27) * 3) === (Math.floor(selectedTile / 3) % 3 + Math.floor(selectedTile / 27) * 3)
            //if it is the same row
            ||
            (Math.floor(index / 9) === Math.floor(selectedTile / 9))
            // //if it is the same column 
            ||
            (index % 9 === selectedTile % 9)
        ) {
            return "hl";
        } else {
            return '';
        }
    }

    isSelected(index, selectedTile) {
        if (index === selectedTile) {
            return 'selected';
        } else {
            return '';
        }
    }


    render() {
        if (this.props.dummy) {
            //blank board on start application
            return (
                <div className="Board"
                    onClick={null}>
                    {
                        Array.from(this.props.sudoku).map((item, index) =>
                            <Tile
                                dummy="dummy"
                                key={index}
                                value='.'
                                disabled={true}
                            />
                        )
                    }
                </ div>
            );

        } else {

            return (
                <div className="Board"
                    onClick={this.props.onClick}>
                    {
                        Array.from(this.props.sudoku).map((item, index) =>
                            <Tile
                                key={index}
                                id={index}
                                highlighted={this.isHighlighted(index, this.props.selectedTile)}
                                value={item === '.' ? '' : item}
                                disabled={this.isInitialNumber(index, item)}
                                onChange={(e) => this.props.onChange(index, e.target.value)}
                                onClick={() => this.props.handleSelectTile(index)}
                                selected={this.isSelected(index, this.props.selectedTile)}
                            />
                        )
                    }
                </div>
            );
        }
    }
}




export default Board;