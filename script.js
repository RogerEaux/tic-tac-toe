const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const displayBoard = () => {};

  const updateBoard = (space, symbol) => {
    const position = space.dataset.space;
    board[position] = symbol;
    console.log(board);
  };

  return { updateBoard, displayBoard };
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
    let symbol;

    if (turn % 2 === 0) {
      symbol = xPlayer.getSymbol();
    } else {
      symbol = oPlayer.getSymbol();
    }
    gameBoard.updateBoard(this, symbol);
    this.removeEventListener('click', playRound);
    turn += 1;
  };

  const initialize = () => {
    boardSpaces.forEach((boardSpace) => {
      boardSpace.addEventListener('click', playRound);
    });
  };

  return { initialize };
})();

game.initialize();
