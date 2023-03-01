const Player = (symbol) => {
  const getSymbol = () => symbol;
  return { getSymbol };
};

const AIPlayer = (() => {
  const { getSymbol } = Player('o');

  const makeMove = (board) => {
    let choice;
    while (board[choice] !== '') {
      choice = Math.floor(Math.random() * 8);
    }

    return choice;
  };

  return { getSymbol, makeMove };
})();

const GameBoard = (() => {
  const AI = document.getElementById('AICheck');
  let board = ['', '', '', '', '', '', '', '', ''];

  const updateBoard = (space, symbol) => {
    const position = space.dataset.space;

    board[position] = symbol;
  };

  const updateDisplay = () => {
    const boardSpaces = document.querySelectorAll('.board-space p');

    for (let i = 0; i <= 8; i += 1) {
      boardSpaces[i].textContent = board[i];
    }
    boardSpaces.forEach((boardSpace) => {
      if (boardSpace.textContent === 'X') {
        boardSpace.classList.add('x');
      } else if (boardSpace.textContent === 'O') {
        boardSpace.classList.add('o');
      }
    });
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    updateDisplay();
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

  const checkAI = (turn) => {
    if (AI.checked && turn % 2 === 0 && turn < 10) {
      const move = AIPlayer.makeMove(board);
      const space = document.querySelector(
        `.board-space[data-space="${move}"]`
      );

      space.click();
    }
  };

  return { resetBoard, updateBoard, updateDisplay, checkWinner, checkAI };
})();

const Game = (() => {
  const xPlayer = Player('X');
  const oPlayer = Player('O');
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
    const winner = GameBoard.checkWinner();
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
    GameBoard.updateBoard(this, getCurrentSymbol());
    this.removeEventListener('click', playRound);
    GameBoard.updateDisplay();
    turn += 1;
    changeMessage(getMessage());
    if (GameBoard.checkWinner()) {
      boardSpaces.forEach((boardSpace) => {
        boardSpace.removeEventListener('click', playRound);
      });
    }
    setTimeout(() => {
      GameBoard.checkAI(turn);
    }, 1000);
  };

  const resetGame = () => {
    const startButton = document.querySelector('.start');
    const main = document.querySelector('.main');

    turn = 1;
    GameBoard.resetBoard();
    boardSpaces.forEach((boardSpace) => {
      boardSpace.firstElementChild.removeAttribute('class');
      boardSpace.addEventListener('click', playRound);
    });
    changeMessage("Let's play");
    main.style.visibility = 'hidden';
    startButton.style.visibility = 'visible';
    startButton.style.top = '40vh';
  };

  const start = () => {
    const reset = document.querySelector('.restart button');

    boardSpaces.forEach((boardSpace) =>
      boardSpace.addEventListener('click', playRound)
    );
    reset.addEventListener('click', resetGame);
  };

  return { start };
})();

const clickStart = () => {
  const startButton = document.querySelector('.start');
  const main = document.querySelector('.main');

  startButton.style.top = '20vh';
  startButton.style.visibility = 'hidden';
  setTimeout(() => {
    main.style.visibility = 'visible';
    startButton.style.top = '0';
  }, 1200);
  Game.start();
};

const startButton = document.querySelector('.start button');

startButton.addEventListener('click', clickStart);
