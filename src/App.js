import React, { Component } from 'react';
import './App.css';
import Board from './Board.jsx';
import sudoku from 'sudoku-umd';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialBoard: '',
			board: '',
			solvedSudoku: '',
		};
		this.inputNumber = this.inputNumber.bind(this);
		this.generateSudoku = this.generateSudoku.bind(this);
		this.checkSudoku = this.checkSudoku.bind(this);
	}


	componentWillMount() {
		this.generateSudoku();
	}


	inputNumber(id, number) {
		number = number ? number : '.';
		const currentBoard = this.state.board;
		const begining = currentBoard.substring(0, id);
		const ending = currentBoard.substring(id + 1, 81);

		const board = "" + begining + number + ending;

		this.setState({
			board
		});
	}

	generateSudoku() {
		const initialBoard = sudoku.generate('easy');
		const solvedSudoku = sudoku.solve(initialBoard);
		this.setState({
			initialBoard,
			board: initialBoard,
			solvedSudoku,
			isErrors: false

		});
	}

	checkSudoku() {
		const solvedSudoku = this.state.solvedSudoku;
		console.log(solvedSudoku);
		const boardArray = Array.from(this.state.board);
		const status = Array.from(solvedSudoku).reduce((obj, item, index) => {
			if (item !== boardArray[index] && boardArray[index] !== '.') {
				obj['bad']++;
			} else {
				obj['ok']++;
			}
			return obj;
		}, {
				ok: 0,
				bad: 0
			});

		this.setState({
			isErrors: true,
			errorsCounter: status.bad
		});
	}

	printCheckStatus() {
		setTimeout(() => {
			this.setState({
				isErrors: false
			});
		}, 1500);
		return this.state.isErrors
			? this.state.errors > 0
				? <p>Found {this.state.errorsCounter} errors!</p>
				: <p>No errors found!</p>
			: null;
	}

	render() {
		return (
			<div className="App">
				<h1>Sudoku App</h1>
				<Board
					initialBoard={this.state.initialBoard}
					sudoku={this.state.board}
					onChange={this.inputNumber}
				/>
				<div className="controls">
					<button onClick={this.checkSudoku}>Check</button>
					<button onClick={this.generateSudoku}>New Game</button>
					<button onClick={null}>Solve</button>
					<button onClick={null}>Restart</button>

				</div>
				<div className="status">
					{
						this.printCheckStatus()

					}
				</div>
			</div>
		);
	}
}

export default App;
