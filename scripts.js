// Game

const game = (() => {
  // create players

  // alternate turns

  // declare win/draw

  // play again?
});

// Gameboard

const gameboard = (() => {
  const board = [];

  const addPiece = (piece, square) => {
    if (typeof board[square] === "undefined") {
      board[square] = piece;
    } else {
      return 'failure';
    };
  };

  const reset = () => {
    board.length = 0;
  };

  return {
    board,
    addPiece,
    reset
  };
})();

// Player

const player = (name, piece) => {
  // prompt to place piece
  const playTurn = () => {
    let square = prompt("Where do you want to place your piece?");
    if (gameboard.addPiece(piece, square) === 'failure') {
      playTurn();
    };
  };

  return { name, piece, playTurn };
};
