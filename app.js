document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  const width = 10;
  const bombsCount = 2 * width;

  let squares = [];
  let isGameOver = false;

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
      alert("Game Over");
      isGameOver = true;
    } else {
      const bombsCount = parseInt(square.getAttribute("totalBombs"));

      if (bombsCount) {
        square.classList.add("visited");
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

  function init() {
    createBoard();
  }

  init();
});
