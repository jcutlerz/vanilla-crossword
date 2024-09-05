const rowCount = 8;
const colCount = 8;

const squares = document.querySelectorAll(".square");
const inputs = document.querySelectorAll("input");
let prevCell = 0;
let prevHighlight = "across";

// number each square
let idCounter = 1;
squares.forEach((square) => {
  square.setAttribute("id", idCounter);
  // start debug
  if (square.children[0]) {
    square.children[0].setAttribute("value", idCounter);
  }
  // end debug
  idCounter += 1;
});

inputs.forEach((input) => {
  // click - apply highlighting to cell
  input.addEventListener("click", (event) => {
    let parentEl = event.target.parentElement;
    let clickedId = parseInt(parentEl.id);

    // toggle between across and vertical highlighting
    if (clickedId === prevCell && prevHighlight === "across") {
      highlightDown(clickedId);
      prevHighlight = "down";
    } else {
      highlightAcross(clickedId);
      prevHighlight = "across";
    }

    prevCell = clickedId;
  });

  // spacebar - toggle highlighting direction
  input.addEventListener("keyup", (event) => {
    if (event.key === " ") {
      console.log("spacebar pressed");
      let parentEl = event.target.parentElement;
      let clickedId = parseInt(parentEl.id);

      // toggle between across and vertical highlighting
      if (clickedId === prevCell && prevHighlight === "across") {
        highlightDown(clickedId);
        prevHighlight = "down";
      } else {
        highlightAcross(clickedId);
        prevHighlight = "across";
      }

      prevCell = clickedId;
    }
  });
});

// clear all previous highlighting
function clearGridHighlighting() {
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

  // clear previously applied highlighting
  clearGridHighlighting();

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
  // clear previously applied highlighting
  clearGridHighlighting();

  // highlight above selected cell
  for (let i = id; i > 0; i -= colCount) {
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight");
  }

  // highlight below selected cell
  for (let i = id; i <= rowCount * colCount; i += colCount) {
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight");
  }
}
