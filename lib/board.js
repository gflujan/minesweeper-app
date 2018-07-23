'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',


		/* ---------------------------------------------
  This fucntion takes the user's input to flip a
  tile and then checks to see if it's been flipped,
  has a bomb, or will return the # of adjacent bombs
  
  I MIGHT NEED TO REMOVE THE ARROW FUNCTION SYNTAX
  --------------------------------------------- */
		value: function flipTile(rowIdx, colIdx) {
			if (this._playerBoard[rowIdx][colIdx] !== ' ') {
				console.log('This tile has already been flipped!');return;
			} else if (this._bombBoard[rowIdx][colIdx] === 'B') {
				this._playerBoard[rowIdx][colIdx] = 'B';
			} else {
				this._playerBoard[rowIdx][colIdx] = this.getNumberOfNeighborBombs(rowIdx, colIdx);
			}

			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',


		/* ---------------------------------------------
  This function determines the number of bombs
  ADJACENT to the "tile" flipped over by the player
  --------------------------------------------- */
		value: function getNumberOfNeighborBombs(rowIdx, colIdx) {
			var _this = this;

			var neighborOffsets = [[-1, -1], // [0]
			[-1, 0], // [1]
			[-1, 1], // [2]
			[0, -1], // [3]
			[0, 1], // [4]
			[1, -1], // [5]
			[1, 0], // [6]
			[1, 1] // [7]
			];

			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;

			// DID I DO THIS CALLBACK METHOD INSIDE OF .forEach() CORRECTLY?
			// I did, the Arrow function, when used inside as a "Callback Method", needs the curly braces in order to work
			neighborOffsets.forEach(function (offset) {
				var neighborRowIdx = rowIdx + offset[0];
				var neighborColIdx = colIdx + offset[1];

				if (neighborRowIdx >= 0 && neighborRowIdx < numberOfRows && neighborColIdx >= 0 && neighborColIdx < numberOfColumns) {
					if (_this._bombBoard[neighborRowIdx][neighborColIdx] === 'B') {
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles !== this._numberOfBombs;
		}
	}, {
		key: 'print',


		/* ---------------------------------------------
  This function formats the boards in a cleaner way
  and then returns them for display
  --------------------------------------------- */
		value: function print() {
			var formattedBoard = this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n');
			return formattedBoard;
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',


		/* ---------------------------------------------
  This function generates the board that the player
  will see and interact with
  --------------------------------------------- */
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var numRowsIdx = 0; numRowsIdx < numberOfRows; numRowsIdx++) {
				var row = [];
				for (var numColsIdx = 0; numColsIdx < numberOfColumns; numColsIdx++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',


		/* ---------------------------------------------
  This fucntion generates a board full of bombs
  that will be checked against the player board
  to see if a "tile" is empty or not
  --------------------------------------------- */
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];
			// This is creating the empty rows and columns for the Bomb board to place bombs in
			for (var numRowsIdx = 0; numRowsIdx < numberOfRows; numRowsIdx++) {
				var row = [];
				for (var numColsIdx = 0; numColsIdx < numberOfColumns; numColsIdx++) {
					row.push(null);
				}
				board.push(row);
			}
			var numberOfBombsPlaced = 0;

			while (numberOfBombsPlaced < numberOfBombs) {
				//	This function places the bombs randomly
				var randRowIdx = Math.floor(Math.random() * numberOfRows); // Generating the random index numbers that will determine the placement of the bomb(s)
				var randColIdx = Math.floor(Math.random() * numberOfColumns);

				if (board[randRowIdx][randColIdx] !== 'B') {
					// Trying to improve this part to stop bombs from being overwritten
					board[randRowIdx][randColIdx] = 'B';
					numberOfBombsPlaced++;
				}
				/* An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
    This will be fixed when you learn about control flow. */
			};
			return board;
		}
	}]);

	return Board;
}();