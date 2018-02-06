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
			showErrorsInfo: false,
			isErrors: false,
			isDisabledCheckButton: true,
			isDisabledSolveButton: true,
			isDisabledRestartButton: true,
			selectedTile: -1,
		};
		this.inputNumber = this.inputNumber.bind(this);
		this.generateSudoku = this.generateSudoku.bind(this);
		this.checkSudoku = this.checkSudoku.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.solveGame = this.solveGame.bind(this);
		this.handleSelectTile = this.handleSelectTile.bind(this);
	}

	componentWillMount() {
		this.generateEmptySudoku();
	}

	generateEmptySudoku() {
		this.setState({
			board: ' '.repeat(81),
			isDummyBoard: true,
		});
	}

	inputNumber(id, number) {
		number = number ? number % 10 : '.';
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
			isDisabledCheckButton: false,
			isDisabledSolveButton: false,
			isDisabledRestartButton: false,
			isDummyBoard: false,
		});
		
	}

	checkSudoku() {
		const isSolvable = sudoku.solve(this.state.board) !== false ? true : false;

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

	handleSelectTile(id) {
        this.setState({
			selectedTile: id
		});
	}
	
	render() {
		return (
			<div
				className="App"
				onClick={(e) => console.log(e.target)}
			>
				<h1>Sudoku App</h1>
				<Board
					dummy={this.state.isDummyBoard}
					initialBoard={this.state.initialBoard}
					sudoku={this.state.board}
					onChange={this.inputNumber}
					onClick={() => this.setState({ showErrorsInfo: false })}
					handleSelectTile={this.handleSelectTile}
					selectedTile={this.state.selectedTile}
				/>
				<div className="controls">
					<button
						onClick={this.checkSudoku}
						disabled={this.state.isDisabledCheckButton}
					>
						Check
					</button>
					<button
						onClick={this.generateSudoku}
						>
						New Game
					</button>
					<button
						onClick={this.solveGame}
						disabled={this.state.isDisabledSolveButton}
						>
						Solve
					</button>
					<button
						onClick={this.resetGame}
						disabled={this.state.isDisabledRestartButton}
					>
						Restart
					</button>
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
