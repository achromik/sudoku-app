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
			isErrors: false,
			showErrorsInfo: false
		});
	}

	checkSudoku() {
		const isSolvable = sudoku.solve(this.state.board) === false ? false : true;

		this.setState({
			isErrors: !isSolvable,
			showErrorsInfo: true
		});
	}

	showCheckStatus() {
		return this.state.showErrorsInfo ?
			this.state.isErrors
				? <p>There is at least one error!</p>
				: <p>Extra! No errors!</p>
			: null;
	}

	resetGame() {
		this.setState({
			board: this.state.initialBoard
		});
	}

	solveGame() {
		this.setState({
			board: sudoku.solve(this.state.board) ? sudoku.solve(this.state.board) : sudoku.solve(this.state.initialBoard)
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
					onClick={() => this.setState({ showErrorsInfo: false })}
				/>
				<div className="controls">
					<button onClick={this.checkSudoku}>Check</button>
					<button onClick={this.generateSudoku}>New Game</button>
					<button onClick={this.solveGame}>Solve</button>
					<button onClick={this.resetGame}>Restart</button>
				</div>
				<div className="status">
					{
						this.showCheckStatus()
					}
				</div>
			</div>
		);
	}
}

export default App;
