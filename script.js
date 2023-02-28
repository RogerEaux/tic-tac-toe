const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const boardSpaces = document.querySelectorAll('.board-space');
  let turn = 1;

  const displayBoard = () => {};

  const updateBoard = function updateBoard() {
    const position = this.dataset.space;
    if (turn % 2 === 0) {
      board[position] = 'o';
    } else {
      board[position] = 'x';
    }
    turn += 1;
    console.log(board);
    displayBoard();
  };

  boardSpaces.forEach((boardSpace) => {
    boardSpace.addEventListener('click', updateBoard);
  });

  return { updateBoard };
})();

const player = (symbol) => {
  const identifySelf = () => {
    console.log(`I am ${symbol} player`);
  };

  return { identifySelf };
};

const game = (() => {
  const xPlayer = player('x');
  const oPlayer = player('o');

  return {};
})();
