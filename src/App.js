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
		this.resetGame = this.resetGame.bind(this);
		this.solveGame = this.solveGame.bind(this);
	}


	componentWillMount() {
		this.generateSudoku();
	}


	inputNumber(id, number) {

		number = number ? number % 10 : '.';
		const currentBoard = this.state.board;
		const begining = currentBoard.substring(0, id);
		const ending = currentBoard.substring(id + 1, 81);

		const board = "" + begining + number + ending;

		this.setState({
			board,
			isErrors: false,
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

		return this.state.isErrors
			? this.state.errorsCounter > 0
				? <p>Found {this.state.errorsCounter} errors!</p>
				: <p>No errors found!</p>
			: null;
	}

	resetGame() {
		this.setState({
			board: this.state.initialBoard
		});
	}

	solveGame() {
		this.setState({
			board: sudoku.solve(this.state.initialBoard)
		});
	}

	render() {
		return (
			<div
				className="App"

			>
				<h1>Sudoku App</h1>
				<Board
					initialBoard={this.state.initialBoard}
					sudoku={this.state.board}
					onChange={this.inputNumber}
					onClick={() => this.setState({ isErrors: false })}
				/>
				<div className="controls">
					<button onClick={this.checkSudoku}>Check</button>
					<button onClick={this.generateSudoku}>New Game</button>
					<button onClick={this.solveGame}>Solve</button>
					<button onClick={this.resetGame}>Restart</button> 

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
