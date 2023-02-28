const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const updateDisplay = () => {
    const boardSpaces = document.querySelectorAll('.board-space');
    for (let i = 0; i <= 8; i += 1) {
      boardSpaces[i].textContent = board[i];
    }
  };

  const updateBoard = (space, symbol) => {
    const position = space.dataset.space;

    board[position] = symbol;
  };

  return { updateBoard, updateDisplay };
})();

const player = (symbol) => {
  const getSymbol = () => symbol;
  return { getSymbol };
};

const game = (() => {
  const xPlayer = player('x');
  const oPlayer = player('o');
  const boardSpaces = document.querySelectorAll('.board-space');
  let turn = 1;

  const playRound = function playRound() {
    let symbol = oPlayer.getSymbol();
    if (turn % 2 === 1) {
      symbol = xPlayer.getSymbol();
    }
    turn += 1;
    gameBoard.updateBoard(this, symbol);
    this.removeEventListener('click', playRound);
    gameBoard.updateDisplay();
  };

  const initialize = () => {
    boardSpaces.forEach((boardSpace) => {
      boardSpace.addEventListener('click', playRound);
    });
  };

  return { initialize };
})();

game.initialize();
