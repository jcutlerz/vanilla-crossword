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

// highlight each horizontal row when clicked
inputs.forEach((input) => {
  input.addEventListener("focus", (event) => {
    let parentEl = event.target.parentElement;
    let clickedId = parseInt(parentEl.id);
    let rowBegin = 1;
    if (clickedId % colCount === 0) {
      rowBegin = clickedId - colCount + 1;
    } else rowBegin = Math.floor(clickedId / colCount) * colCount + 1;
    let rowEnd = rowBegin + colCount - 1;

    console.log("clicked, begin, end");
    console.log(clickedId, rowBegin, rowEnd);

    // clear all previous highlighting
    inputs.forEach((input) => {
      input.classList.remove("highlight");
    });

    // highlight to the left of selected cell
    for (let i = clickedId - 1; i >= rowBegin; i--) {
      let cell = document.getElementById(i);
      if (!cell.children[0]) {
        break;
      }
      cell.children[0].classList.add("highlight");
    }

    // highlight to the right of selected cell
    for (let i = clickedId + 1; i <= rowEnd; i++) {
      let cell = document.getElementById(i);
      if (!cell.children[0]) {
        break;
      }
      cell.children[0].classList.add("highlight");
    }

    //const nextId = parseInt(parentEl.id) + 1;
    //const nextCell = document.getElementById(nextId);
    //nextCell.children[0].classList.add("highlight");
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
