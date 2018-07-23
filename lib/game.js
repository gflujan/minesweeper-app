'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Game);

		this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Game, [{
		key: 'playMove',
		value: function playMove(rowIdx, colIdx) {
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
	}]);

	return Game;
}();