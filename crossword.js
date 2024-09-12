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
    let selectedId = parseInt(parentEl.id);
    applyGridHighlight(selectedId);
    input.classList.add("highlight-selected");
  });

  input.addEventListener("keyup", (event) => {
    let newCell = prevCell;
    let i = 0;
    switch (event.key) {
      // spacebar - toggle highlighting direction
      case " ":
        applyGridHighlight(newCell);
        squares[newCell - 1].children[0].classList.add("highlight-selected");
        break;
      case "ArrowRight":
      case "ArrowLeft":
      case "ArrowUp":
      case "ArrowDown":
        if (event.key === "ArrowRight") {
          i = 1;
        } else if (event.key === "ArrowLeft") {
          i = -1;
        } else if (event.key === "ArrowUp") {
          i = -1 * colCount;
        } else if (event.key === "ArrowDown") {
          i = colCount;
        }

        newCell += i;
        // squares index is one less than id
        while (!squares[newCell - 1] || !squares[newCell - 1].children[0]) {
          if (!squares[newCell - 1]) {
            break;
          }
          newCell += i;
        }
        if (!squares[newCell - 1]) {
          break;
        } else {
          applyGridHighlight(newCell);
          squares[newCell - 1].children[0].classList.add("highlight-selected");
          break;
        }
    }
  });
});

// clear all previous highlighting
function clearGridHighlighting() {
  inputs.forEach((input) => {
    input.classList.remove("highlight-grid");
    input.classList.remove("highlight-selected");
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
    cell.children[0].classList.add("highlight-grid");
  }

  // highlight to the right of selected cell
  for (let i = id + 1; i <= rowEnd; i++) {
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight-grid");
  }
}

// apply vertical highlighting to puzzle grid
function highlightDown(id) {
  // clear previously applied highlighting
  clearGridHighlighting();

  // highlight above selected cell
  for (let i = id; i > 0; i -= colCount) {
    if (i === id) {
      continue;
    }
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight-grid");
  }

  // highlight below selected cell
  for (let i = id; i <= rowCount * colCount; i += colCount) {
    if (i === id) {
      continue;
    }
    let cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight-grid");
  }
}

// apply grid highlighting after certain events
function applyGridHighlight(id) {
  // toggle between across and vertical highlighting
  if (id === prevCell && prevHighlight === "across") {
    highlightDown(id);
    prevHighlight = "down";
  } else {
    highlightAcross(id);
    prevHighlight = "across";
  }

  prevCell = id;
}
