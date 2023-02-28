const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const changeBoard = (player, position) => {
    if (player === 'x') {
      board[position] = 'o';
    } else {
      board[position] = 'x';
    }
  };

  return { changeBoard };
})();

const player = (symbol) => {
  const identifySelf = () => {
    console.log(`I am ${symbol} player`);
  };

  return { identifySelf };
};

const xPlayer = player('x');
xPlayer.identifySelf();
