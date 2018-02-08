import React, { Component } from 'react';
import './App.css';
import Board from './Board.jsx';
import sudoku from 'sudoku-umd';
import Levels from './Levels';
import Controls from './Controls';


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
			showLevels: false,
			showControls: true,
		};
		this.inputNumber = this.inputNumber.bind(this);
		this.generateSudoku = this.generateSudoku.bind(this);
		this.checkSudoku = this.checkSudoku.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.solveGame = this.solveGame.bind(this);
		this.handleSelectTile = this.handleSelectTile.bind(this);
		this.showLevelsOption = this.showLevelsOption.bind(this);
		this.hideErrorsInfo = this.hideErrorsInfo.bind(this);
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
		//validating if number between 1 and 9
		number = number
			? number % 10 > 0
				? number % 10
				: '.'
			: '.';
		const currentBoard = this.state.board;
		const begining = currentBoard.substring(0, id);
		const ending = currentBoard.substring(id + 1, 81);
		const board = "" + begining + number + ending;

		this.setState({
			board
		});

	}

	generateSudoku(level) {
		let initialBoard;
		switch (level) {
			case 0:
				initialBoard = sudoku.generate('easy');
				break;
			case 1:
				initialBoard = sudoku.generate('medium');
				break;
			case 2:
				initialBoard = sudoku.generate('hard');
				break;
			case 3:
				initialBoard = sudoku.generate('very-hard');
				break;
			default:
				initialBoard = sudoku.generate('medium');
		}
		const solvedSudoku = sudoku.solve(initialBoard);
		this.setState({
			initialBoard,
			board: initialBoard,
			solvedSudoku,
			isDisabledCheckButton: false,
			isDisabledSolveButton: false,
			isDisabledRestartButton: false,
			isDummyBoard: false,
			selectedTile: -1,
			showLevels: false,
			showControls: true,
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

	showLevelsOption(level) {
		this.setState({
			showLevels: true,
			showControls: false
		});
	}

	hideErrorsInfo() {
		this.setState({ 
			showErrorsInfo: false 
		});
	}

	render() {
		return (
			<div
				className="App"
			>
				<h1>Sudoku App</h1>
				<Board
					dummy={this.state.isDummyBoard}
					initialBoard={this.state.initialBoard}
					sudoku={this.state.board}
					onChange={this.inputNumber}
					onClick={this.hideErrorsInfo}
					handleSelectTile={this.handleSelectTile}
					selectedTile={this.state.selectedTile}
				/>
				<Controls
					visible={this.state.showControls}
					checkSudoku={this.checkSudoku}
					isDisabledCheckButton={this.state.isDisabledCheckButton}
					showLevelsOption={this.showLevelsOption}
					solveGame={this.solveGame}
					isDisabledSolveButton={this.state.isDisabledSolveButton}
					resetGame={this.resetGame}
					isDisabledRestartButton={this.state.isDisabledRestartButton}
				/>
				<Levels
					visible={this.state.showLevels}
					level={this.generateSudoku}
				/>
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
