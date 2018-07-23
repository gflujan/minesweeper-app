export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard() { return this._playerBoard; }

	/* ---------------------------------------------
	This fucntion takes the user's input to flip a
	tile and then checks to see if it's been flipped,
	has a bomb, or will return the # of adjacent bombs

	I MIGHT NEED TO REMOVE THE ARROW FUNCTION SYNTAX
	--------------------------------------------- */
	flipTile(rowIdx, colIdx) {
		if (this._playerBoard[rowIdx][colIdx] !== ' ') {
			console.log('This tile has already been flipped!'); return
		} else if (this._bombBoard[rowIdx][colIdx] === 'B') {
			this._playerBoard[rowIdx][colIdx] = 'B';
		} else {
			this._playerBoard[rowIdx][colIdx] = this.getNumberOfNeighborBombs(rowIdx, colIdx);
		}

		this._numberOfTiles--;
	};

	/* ---------------------------------------------
	This function determines the number of bombs
	ADJACENT to the "tile" flipped over by the player
	--------------------------------------------- */
	getNumberOfNeighborBombs(rowIdx, colIdx) {
		const neighborOffsets = [
			[-1,-1],		// [0]
			[-1,0],		// [1]
			[-1,1],		// [2]
			[0,-1],		// [3]
			[0,1],		// [4]
			[1,-1],		// [5]
			[1,0],		// [6]
			[1,1]			// [7]
		];

		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;

		// DID I DO THIS CALLBACK METHOD INSIDE OF .forEach() CORRECTLY?
		// I did, the Arrow function, when used inside as a "Callback Method", needs the curly braces in order to work
		neighborOffsets.forEach(offset => {
			const neighborRowIdx = rowIdx + offset[0];
			const neighborColIdx = colIdx + offset[1];

			if ((neighborRowIdx >= 0) && (neighborRowIdx < numberOfRows) && (neighborColIdx >= 0) && (neighborColIdx < numberOfColumns)) {
				if (this._bombBoard[neighborRowIdx][neighborColIdx] === 'B') {
					numberOfBombs++;
				}
			}
		});
		return numberOfBombs;
	};

	hasSafeTiles() {
		return this._numberOfTiles !== this._numberOfBombs;
	};

	/* ---------------------------------------------
	This function formats the boards in a cleaner way
	and then returns them for display
	--------------------------------------------- */
	print() {
		const formattedBoard = this._playerBoard.map(row => row.join(' | ')).join('\n');
		return formattedBoard;
	};

	/* ---------------------------------------------
	This function generates the board that the player
	will see and interact with
	--------------------------------------------- */
	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];
		for (let numRowsIdx = 0; numRowsIdx < numberOfRows; numRowsIdx++) {
			let row = [];
			for (let numColsIdx = 0; numColsIdx < numberOfColumns; numColsIdx++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	};

	/* ---------------------------------------------
	This fucntion generates a board full of bombs
	that will be checked against the player board
	to see if a "tile" is empty or not
	--------------------------------------------- */
	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];
		// This is creating the empty rows and columns for the Bomb board to place bombs in
		for (let numRowsIdx = 0; numRowsIdx < numberOfRows; numRowsIdx++) {
			let row = [];
			for (let numColsIdx = 0; numColsIdx < numberOfColumns; numColsIdx++) {
				row.push(null);
			}
			board.push(row);
		}
		let numberOfBombsPlaced = 0;

		while (numberOfBombsPlaced < numberOfBombs) { //	This function places the bombs randomly
			let randRowIdx = Math.floor((Math.random() * numberOfRows)); // Generating the random index numbers that will determine the placement of the bomb(s)
			let randColIdx = Math.floor((Math.random() * numberOfColumns));

			if (board[randRowIdx][randColIdx] !== 'B') { // Trying to improve this part to stop bombs from being overwritten
				board[randRowIdx][randColIdx] = 'B'
				numberOfBombsPlaced++;
			}
			/* An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
			This will be fixed when you learn about control flow. */
		};
		return board;
	};
}

// This doesn't work, it gives me an error
// export default Board;
