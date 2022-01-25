// Gameboard

const gameboard = (() => {
  const board = [];

  const addPiece = (piece, square) => {
    board[square] = piece;
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
