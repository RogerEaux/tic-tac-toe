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

  const checkWinner = () => {};

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
    let message = `${getCurrentSymbol().toUpperCase()} player's turn`;

    if (turn > 9) {
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
    gameBoard.checkWinner();
    turn += 1;
    changeMessage(getMessage());
  };

  const start = () => {
    boardSpaces.forEach((boardSpace) => {
      boardSpace.addEventListener('click', playRound);
    });
  };

  return { start };
})();

game.start();
