const rowCount = 8;
const colCount = 8;

const squares = document.querySelectorAll(".square");
const inputs = document.querySelectorAll("input");

// number each square
let idCounter = 1;
squares.forEach((square) => {
  square.setAttribute("id", idCounter);
  idCounter += 1;
});

inputs.forEach((input) => {
  input.addEventListener("click", (event) => {
    let parentEl = event.target.parentElement;
    const nextId = parseInt(parentEl.id) + 1;
    const nextCell = document.getElementById(nextId);
    nextCell.children[0].classList.add("highlight");
  });
});

/* x for the row and y for the column  */
function getElementOfCssGrid(x, y) {
  let n = 8 * (x - 1) + y;
  return document.querySelector(".grid-item:nth-child(" + n + ")");
}

// return coordinates of a css grid cell

// return a css grid cell given a set of coordinates

// highlight entire across clue of selected cell

// highlight entire down clue of selected cell
