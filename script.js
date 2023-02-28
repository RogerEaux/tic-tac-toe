const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const updateBoard = (space, symbol) => {
    const position = space.dataset.space;
    const content = document.createElement('p');
    content.classList.add('symbol');
    content.textContent = symbol;

    board[position] = symbol;
    space.appendChild(content);
  };

  return { updateBoard };
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
