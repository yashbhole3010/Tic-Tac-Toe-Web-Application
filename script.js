
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();
}

function checkWinner() {
  let roundWon = false;
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      document.querySelector(`[data-index='${a}']`).classList.add('win');
      document.querySelector(`[data-index='${b}']`).classList.add('win');
      document.querySelector(`[data-index='${c}']`).classList.add('win');
      celebrate();  // trigger celebration
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
}

function celebrate() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti(Object.assign({}, defaults, {
      particleCount: 50,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
