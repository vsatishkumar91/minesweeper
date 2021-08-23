document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');

  const width = 10;
  const bombsCount = 2 * width;




  let squares = [];
  let isGameOver = false;

  function createBoard() {
    const bombsList = Array(bombsCount).fill("bomb");
    const emptyList = Array(width * width - bombsCount).fill("empty");
    const totalList = bombsList.concat(emptyList).sort(() => Math.random() - 0.5);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.setAttribute('id', i * width + j);
        square.classList.add(totalList[i * width + j]);
        square.addEventListener('click', revealClue);
        grid.appendChild(square);
        squares.push(square);
      }
    }
    fillCluesCount();
  }

  function fillCluesCount() {
    for (let i = 0; i < width * width; i++) {
      let totalBomb = 0;
      const isLeftEdge = i % width == 0;
      const isRightEdge = i % width == width - 1;
      const isTopEdge = i < width;
      const isBottomEdge = Math.floor(i/width) == width - 1;

      if (!isTopEdge && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) totalBomb++;
      if (!isTopEdge && !isRightEdge && squares[i - width + 1].classList.contains('bomb')) totalBomb++;
      if (!isLeftEdge && squares[i - 1].classList.contains('bomb')) totalBomb++;
      if (!isRightEdge && squares[i + 1].classList.contains('bomb')) totalBomb++;

      if (!isBottomEdge && !isLeftEdge && squares[i + width - 1].classList.contains('bomb')) totalBomb++;
      if (!isBottomEdge && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) totalBomb++;

      if (!isTopEdge && squares[i - width].classList.contains('bomb')) totalBomb++;
      if (!isBottomEdge && squares[i + width].classList.contains('bomb')) totalBomb++;

      squares[i].innerHTML = totalBomb;
    }
  }

  function revealClue(e) {
    console.log(e.id);
  }


  function init() {
    createBoard();
  }

  init();

});
