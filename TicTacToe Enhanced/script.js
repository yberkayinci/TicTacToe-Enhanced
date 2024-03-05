window.onload = () => {
  let players = [{ name: "O player", sign: "O" }, { name: "X player", sign: "X" }];
  let gameMode = '';
  let cPlayer = 0;
  let board = Array.from(Array(3), () => Array(3).fill(null));
  let winner = null;
  let count = 0;

  document.getElementById('pvpMode').addEventListener('click', () => setGameMode('PVP'));
  document.getElementById('pvcMode').addEventListener('click', () => setGameMode('PVC'));
  document.getElementById('tournamentMode').addEventListener('click', () => setGameMode('Tournament'));
  document.getElementById('restartButton').addEventListener('click', restartGame);

  function setGameMode(mode) {
    gameMode = mode;
    restartGame();
  }

  let list = document.querySelectorAll(".square");
  list.forEach(x => {
    x.addEventListener("click", elm => {
      if ((gameMode === 'PVP') || (gameMode === 'PVC' && cPlayer === 0)) {
        makeMove(elm.target.dataset.board);
      }
    });
  });

  function makeMove(location) {
    if (winner !== null || !gameMode) return;
    let [x, y] = location.split("").map(Number);
    if (board[x][y] === null) {
      board[x][y] = players[cPlayer].sign;
      document.querySelector(`[data-board='${location}']`).textContent = players[cPlayer].sign;
      count++;
      if (checkForWinner()) {
        return;  // Kazanan belirlendiğinde veya beraberlik olduğunda daha fazla işlem yapma
      }
      cPlayer = 1 - cPlayer;
      if (gameMode === 'PVC' && cPlayer === 1 && !winner) {
        setTimeout(computerMove, 500);
      }
    }
  }
  

  function checkForWinner() {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        winner = cPlayer;
      }
      if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        winner = cPlayer;
      }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      winner = cPlayer;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      winner = cPlayer;
    }
    if (winner !== null) {
      document.querySelector(".info").textContent = `${players[winner].name} wins!`;
      // Kazanan belirlendikten sonra oyun durduruluyor
      return true;
    } else if (count === 9) {
      document.querySelector(".info").textContent = `It's a draw`;
      return true;
    }
    return false;
  }
  
  function computerMove() {
    // Eğer bir kazanan varsa veya berabere ise, bilgisayar hamle yapmamalı
    if (winner !== null || count === 9) return;
  
    let emptySquares = [];
    board.forEach((row, i) => {
      row.forEach((val, j) => {
        if (!val) emptySquares.push([i, j]);
      });
    });
    if (emptySquares.length > 0) {
      let [x, y] = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      board[x][y] = players[1].sign;
      document.querySelector(`[data-board='${x}${y}']`).textContent = players[1].sign;
      count++;
      checkForWinner();
    }
  }
  
  
  function computerMove() {
    let emptySquares = [];
    board.forEach((row, i) => {
      row.forEach((val, j) => {
        if (!val) emptySquares.push([i, j]);
      });
    });
    if (emptySquares.length > 0) {
      let [x, y] = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      board[x][y] = players[1].sign;
      document.querySelector(`[data-board='${x}${y}']`).textContent = players[1].sign;
      count++;
      checkForWinner();
      if (!winner) {
        cPlayer = 0; // Bilgisayar hamlesi bittikten sonra oyuncuya geri dön
      }
    }
  }
  
  

  function restartGame() {
    board = Array.from(Array(3), () => Array(3).fill(null));
    winner = null;
    count = 0;
    cPlayer = 0;
    list.forEach(x => x.textContent = '');
    document.querySelector(".info").textContent = '';
    if (gameMode === 'PVC') {
      setTimeout(computerMove, 500);
    }
  }
};
