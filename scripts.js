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

const player = (name, piece) => {
  const playTurn = () => {
    const square = prompt(`${name}, where do you want to place your piece?`);
    if (parseInt(square) >= 1 && parseInt(square) <= 9 && gameboard.board[(parseInt(square) - 1)] === undefined) {
      gameboard.addPiece(piece, (parseInt(square) - 1));
    } else {
      playTurn();
    };
  };

  return { name, piece, playTurn };
};

const game = (() => {
  const checkForDraw = (board) => {
    if (board.length === 9 && !board.includes('undefined') && checkForWin(board) === false) {
      gameStatus = 'draw';
      alert(`It's a draw!`);
    };  
  };

  const checkForWin = (board) => {
    const winningScenarios = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ];

    winningScenarios.forEach(scenario => {
      if (scenario.every(piece => piece === currentPlayer.piece)) {
        gameStatus = 'win';
        alert(`Congrats ${currentPlayer.name}! You won!`);
      };
    });
  };

  const playerOne = player(prompt("Player one, what is your name?"), 'X');
  const playerTwo = player(prompt("Player two, what is your name?"), 'O');
  let currentPlayer = playerOne;
  let gameStatus = 'not over';

  while (gameStatus === 'not over') {
    currentPlayer.playTurn();
    checkForWin(gameboard.board);
    checkForDraw(gameboard.board);
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
    } else {
      currentPlayer = playerOne;
    };
  };
});

// display game

const gameSection = document.getElementById("game-section");
const matchup = document.getElementById("matchup");
const startForm = document.getElementById("start-form");
startForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const playerOne = player(startForm.elements.namedItem("player-one").value, 'X');
  const playerTwo = player(startForm.elements.namedItem("player-two").value, 'O');
  matchup.textContent = `${playerOne.name.toUpperCase()} versus ${playerTwo.name.toUpperCase()}`;
  startForm.style.display = "none";
  gameSection.style.display = "block";
});

// cell event listeners