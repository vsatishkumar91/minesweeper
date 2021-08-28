document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const flagsLeft = document.querySelector('#flags-left');
  const timeCompleted = document.querySelector('#time-completed');
  const result = document.querySelector('#result')

  const width = 10;
  const bombsCount = 20;

  let squares = [];
  let isGameOver = false;
  let flagsCount = 0;
  let time = 0;
  let timeInterval;

  function createBoard() {
    const bombsList = Array(bombsCount).fill("bomb");
    const emptyList = Array(width * width - bombsCount).fill("empty");
    const totalList = bombsList
      .concat(emptyList)
      .sort(() => Math.random() - 0.5);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.setAttribute("id", i * width + j);
        square.classList.add(totalList[i * width + j]);
        grid.appendChild(square);
        squares.push(square);
        square.addEventListener("click", function (e) {
          revealClue(square);
        });
        square.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          toggleFlag(square);
        });
      }
    }
    fillCluesCount();
  }

  function fillCluesCount() {
    for (let i = 0; i < width * width; i++) {
      if (!squares[i].classList.contains("bomb")) {
        let totalBomb = 0;
        const isLeftEdge = i % width == 0;
        const isRightEdge = i % width == width - 1;
        const isTopEdge = i < width;
        const isBottomEdge = Math.floor(i / width) == width - 1;
        if (
          !isTopEdge &&
          !isLeftEdge &&
          squares[i - width - 1].classList.contains("bomb")
        )
          totalBomb++;
        if (
          !isTopEdge &&
          !isRightEdge &&
          squares[i - width + 1].classList.contains("bomb")
        )
          totalBomb++;
        if (!isLeftEdge && squares[i - 1].classList.contains("bomb"))
          totalBomb++;
        if (!isRightEdge && squares[i + 1].classList.contains("bomb"))
          totalBomb++;

        if (
          !isBottomEdge &&
          !isLeftEdge &&
          squares[i + width - 1].classList.contains("bomb")
        )
          totalBomb++;
        if (
          !isBottomEdge &&
          !isRightEdge &&
          squares[i + width + 1].classList.contains("bomb")
        )
          totalBomb++;

        if (!isTopEdge && squares[i - width].classList.contains("bomb"))
          totalBomb++;
        if (!isBottomEdge && squares[i + width].classList.contains("bomb"))
          totalBomb++;

        squares[i].setAttribute("totalBombs", totalBomb);
      }
    }
  }

  function revealClue(square) {
    if (isGameOver) return;
    if (square.classList.contains("visited")) return;
    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      const bombsCount = parseInt(square.getAttribute("totalBombs"));

      if (bombsCount) {
        square.classList.add("visited");
        if (bombsCount == 1) square.classList.add('one')
        if (bombsCount == 2) square.classList.add('two')
        if (bombsCount == 3) square.classList.add('three')
        if (bombsCount == 4) square.classList.add('four')
        square.innerHTML = bombsCount;
        return;
      }
      checkSquare(square);
    }
    square.classList.add("visited");
  }

  function checkSquare(square) {
    const id = parseInt(square.id);
    const isLeftEdge = id % width == 0;
    const isRightEdge = id % width == width - 1;
    const isTopEdge = id < width;
    const isBottomEdge = Math.floor(id / width) == width - 1;

    setTimeout(() => {
      if (!isTopEdge && !isLeftEdge) {
        const newId = squares[id - width - 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isTopEdge && !isRightEdge) {
        const newId = squares[id - width + 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isLeftEdge) {
        const newId = squares[id - 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isRightEdge) {
        const newId = squares[id + 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isBottomEdge && !isLeftEdge) {
        const newId = squares[id + width - 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isBottomEdge && !isRightEdge) {
        const newId = squares[id + width + 1].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isTopEdge) {
        const newId = squares[id - width].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }

      if (!isBottomEdge) {
        const newId = squares[id + width].id;
        const newSquare = document.getElementById(newId);
        revealClue(newSquare);
      }
    }, 10);
  }

  function gameOver(square) {
    isGameOver = true;
    squares.forEach((item) => {
      if (item.classList.contains("bomb")) {
        item.classList.add('blast');
      }
    });
    result.innerHTML = "You loose the game. Better luck next time!";
    clearInterval(timeInterval);
  }

  function toggleFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("visited")) {
      if (square.classList.contains("flag")) {
        flagsCount--;
        square.innerHTML = "";
        square.classList.remove("flag");
      } else {
        if (flagsCount <= bombsCount) {
          flagsCount++;
          square.classList.add("flag");
        } 
        if(flagsCount == bombsCount) {
          checAllBombsCaptured(square);
        }
      }
      flagsLeft.innerHTML = bombsCount- flagsCount;
    }
  }

  function checAllBombsCaptured(square) {
    let allBombsCaptured = true;
    isGameOver = true;
    for (let i = 0; i < width * width; i++) {
      if (squares[i].classList.contains("bomb")) {
        allBombsCaptured = squares[i].classList.contains("flag");
        if (!allBombsCaptured) {
          break;
        }
      }
    }
    if(allBombsCaptured) {
      result.innerHTML = "Congratulations, You won the game!";
    } else {
      gameOver(square);
    }
    clearInterval(timeInterval);
  }

  function init() {
    createBoard();
    flagsLeft.innerHTML = bombsCount;
    timeCompleted.innerHTML = time;
    timeInterval = setInterval(() => {
      time++;
      timeCompleted.innerHTML = time;
    }, 1000);
  }

  init();
});
