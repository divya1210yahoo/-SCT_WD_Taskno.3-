
const board = document.getElementById('board');
const status = document.getElementById('status');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleClick);
    div.textContent = cell || '';
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  createBoard();

  if (checkWin()) {
    status.textContent = 🎉 Player ${currentPlayer} wins!;
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = It's a draw!;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = Player ${currentPlayer}'s turn;
  }
}

function checkWin() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return wins.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = Player ${currentPlayer}'s turn;
  createBoard();
}

createBoard();