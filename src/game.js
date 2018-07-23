// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	playMove(rowIdx, colIdx) {
		this._board.flipTile(rowIdx, colIdx);

		if (this._board.playerBoard[rowIdx][colIdx] === 'B') {
			console.log('D\'oh! Sorry bud, the game is over. *sadface*');
			console.log(this._board.print());
			// console.log(this._board);
		} else if (!this._board.hasSafeTiles()) {
			console.log('Huzzah! You have bested me this time. But I shall be back. *waves fist menacingly*');
		} else {
			console.log('Current board:');
			console.log(this._board.print());
			// console.log(this._board);
		}
	}
}
