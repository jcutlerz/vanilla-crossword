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

    highlightAcross(clickedId);
  });
});

// clear all previous highlighting
function clearHighlighting() {
  inputs.forEach((input) => {
    input.classList.remove("highlight");
  });
}

// apply horizontal highlighting to puzzle grid
function highlightAcross(id) {
  let rowBegin = 1;
  if (id % colCount === 0) {
    rowBegin = id - colCount + 1;
  } else rowBegin = Math.floor(id / colCount) * colCount + 1;
  let rowEnd = rowBegin + colCount - 1;

  console.log("clicked, begin, end");
  console.log(id, rowBegin, rowEnd);

  clearHighlighting();

  // highlight to the left of selected cell
  for (let i = id - 1; i >= rowBegin; i--) {
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight");
  }

  // highlight to the right of selected cell
  for (let i = id + 1; i <= rowEnd; i++) {
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight");
  }
}

// apply vertical highlighting to puzzle grid
function highlightDown(id) {
  console.log("sup");
}
