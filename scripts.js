const gameboard = (() => {
  let board = [];

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

const player = (name, piece) => {
  return { name, piece };
};

const game = (() => {
  const isValidAction = (cell) => {
    if (cell.textContent === 'X' || cell.textContent === 'O') {
      return false;
    };

    return true;
  };

  const play = (playerOne, playerTwo) => {
    let startingPlayer = playerOne;
    let currentPlayer = startingPlayer;
    let gameOver = false;
    const result = document.getElementById('result');
    const playAgainBtn = document.getElementById('play-again-btn');
  
    const checkForDraw = (board, currentPlayer) => {
      if (board.length === 9 && !board.includes(undefined) && !checkForWin(board, currentPlayer)) {
        gameOver = true;
        result.textContent = "It's a draw!";
        result.style.display = "block";
        playAgainBtn.style.display = "block";
      };  
    };
  
    const checkForWin = (board, currentPlayer) => {
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
        if (scenario.every(square => square === currentPlayer.piece)) {
          gameOver = true;
          result.textContent = `Congrats ${currentPlayer.name}! You won!`;
          result.style.display = "block";
          playAgainBtn.style.display = "block";
        } else {
          return false;
        };
      });
    };

    const changePlayer = () => {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const cells = document.getElementsByClassName("cell");
    Array.prototype.forEach.call(cells, (cell) => {
      cell.addEventListener('click', () => {
        if (isValidAction(cell) && !gameOver) {
          gameboard.addPiece(currentPlayer.piece, parseInt(cell.dataset.cellNumber));
          cell.textContent = currentPlayer.piece;
          checkForDraw(gameboard.board, currentPlayer);
          checkForWin(gameboard.board, currentPlayer);
          changePlayer();
        };
      });
    });

    const clearCells = () => {
      const cells = document.getElementsByClassName("cell");

      Array.prototype.forEach.call(cells, (cell) => {
        cell.textContent = '';
      });
    };

    playAgainBtn.onclick = () => {
      gameboard.reset();
      clearCells();
      playAgainBtn.style.display = "none";
      result.style.display = "none";
      startingPlayer = startingPlayer === playerOne ? playerTwo : playerOne;
      currentPlayer = startingPlayer;
      gameOver = false;
    };
  };

  return { play };
})();

// display game, create players, and start game
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
  game.play(playerOne, playerTwo);
});
