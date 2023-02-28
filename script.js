const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const updateBoard = (space, symbol) => {
    const position = space.dataset.space;

    board[position] = symbol;
  };

  const updateDisplay = () => {
    const boardSpaces = document.querySelectorAll('.board-space');

    for (let i = 0; i <= 8; i += 1) {
      boardSpaces[i].textContent = board[i];
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i += 1) {
      if (
        board[i] !== '' &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        return board[i];
      }
    }

    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] !== '' &&
        board[i] === board[i + 1] &&
        board[i] === board[i + 2]
      ) {
        return board[i];
      }
    }

    if (
      (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
      (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
    ) {
      return board[4];
    }

    return '';
  };

  return { updateBoard, updateDisplay, checkWinner };
})();

const player = (symbol) => {
  const getSymbol = () => symbol;
  return { getSymbol };
};

const game = (() => {
  const xPlayer = player('X');
  const oPlayer = player('O');
  const boardSpaces = document.querySelectorAll('.board-space');
  let turn = 1;

  const getCurrentSymbol = () => {
    let symbol = xPlayer.getSymbol();

    if (turn % 2 === 0) {
      symbol = oPlayer.getSymbol();
    }

    return symbol;
  };

  const getMessage = () => {
    const winner = gameBoard.checkWinner();
    let message = `${getCurrentSymbol().toUpperCase()} player's turn`;

    if (winner) {
      message = `${winner} wins!`;
    } else if (turn > 9) {
      message = 'Game over! Tie.';
    }

    return message;
  };

  const changeMessage = (message) => {
    const messageDisplay = document.querySelector('.message');

    messageDisplay.textContent = message;
  };

  const playRound = function playRound() {
    gameBoard.updateBoard(this, getCurrentSymbol());
    this.removeEventListener('click', playRound);
    gameBoard.updateDisplay();
    turn += 1;
    changeMessage(getMessage());
    if (gameBoard.checkWinner()) {
      boardSpaces.forEach((boardSpace) => {
        boardSpace.removeEventListener('click', playRound);
      });
    }
  };

  const start = () => {
    boardSpaces.forEach((boardSpace) => {
      boardSpace.addEventListener('click', playRound);
    });
  };

  return { start };
})();

game.start();
