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
  }

  function revealClue(e) {
    console.log(e.id);
  }


  function init() {
    createBoard();
  }

  init();

});
