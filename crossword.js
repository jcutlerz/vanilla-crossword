const rowCount = 13;
const colCount = 13;

const answer =
  "PEPPESTSILOAVAASHEHOEDRAGUSEDOWEDELLATARS\
STAYYAWNSTINETOOPALANTAVOWSICEGASTAMZONE\
BETSYONESCOALOBOEALTOALLYEDSMEOWLIKERIP\
POPSLESSSEA";

const squares = document.querySelectorAll(".square");
const inputs = document.querySelectorAll("input");
const acrossClues = document.querySelectorAll(".left-side > p");
const downClues = document.querySelectorAll(".right-side > p");
let selectedCell = 0;
let direction = "across";

// number each square
let idCounter = 1;
squares.forEach((square) => {
  square.setAttribute("id", idCounter);
  idCounter += 1;
});

// number each clue
acrossClues.forEach((clue) => {
  // clue.classList.add("clue-selected");
  clue.setAttribute("id", "across-" + clue.innerHTML.match(/^\d+/));
});
downClues.forEach((clue) => {
  // clue.classList.add("clue-selected-alt");
  clue.setAttribute("id", "down-" + clue.innerHTML.match(/^\d+/));
});

inputs.forEach((input) => {
  // click - apply highlighting to cell
  input.addEventListener("click", (event) => {
    const selectedId = parseInt(event.target.parentElement.id);
    applyGridHighlight(selectedId);
    input.classList.add("highlight-selected");
    applyClueHighlight();
  });

  input.addEventListener("keyup", (event) => {
    let newCell = selectedCell;
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
          squares[newCell - 1].children[0].focus();
          break;
        }
    }
    applyClueHighlight();
    const alpha = /^[A-Za-z]$/;
    if (alpha.test(event.key)) {
      input.value = event.key.toUpperCase();
      checkAnswer();
    } else if (event.key === "Delete" || event.key === "Backspace") {
      input.value = "";
    }
  });
});

// clear all previous highlighting
function clearGridHighlighting() {
  const clearables = document.querySelectorAll(
    ".highlight-grid, .highlight-selected, .clue-selected"
  );

  clearables.forEach((item) => {
    item.classList.remove(
      "highlight-grid",
      "highlight-selected",
      "clue-selected"
    );
  });
}

// apply horizontal highlighting to puzzle grid
function highlightAcross(id) {
  let rowBegin = 1;
  if (id % colCount === 0) {
    rowBegin = id - colCount + 1;
  } else rowBegin = Math.floor(id / colCount) * colCount + 1;
  const rowEnd = rowBegin + colCount - 1;

  // clear previously applied highlighting
  clearGridHighlighting();

  // highlight to the left of selected cell
  for (let i = id - 1; i >= rowBegin; i--) {
    const cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight-grid");
  }

  // highlight to the right of selected cell
  for (let i = id + 1; i <= rowEnd; i++) {
    const cell = document.getElementById(i);
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
    const cell = document.getElementById(i);
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
    const cell = document.getElementById(i);
    if (!cell.children[0]) {
      break;
    }
    cell.children[0].classList.add("highlight-grid");
  }
}

// apply grid highlighting after certain events
function applyGridHighlight(id) {
  if (id === selectedCell) {
    // toggling (by spacebar or repeated clicks) changes highlight direction
    if (direction === "across") {
      highlightDown(id);
      direction = "down";
    } else {
      highlightAcross(id);
      direction = "across";
    }
  } else {
    // movement to a different cell should maintain highlight direction
    if (direction === "across") {
      highlightAcross(id);
      selectedCell = id;
    } else {
      highlightDown(id);
      selectedCell = id;
    }
  }
}

// apply clue highlighting
function applyClueHighlight() {
  const highlighted = document.querySelector(
    ".highlight-grid, .highlight-selected"
  );

  const clueNumber = document.querySelector(
    "#" + CSS.escape(highlighted.parentElement.id) + " > p"
  ).innerHTML;

  const actualClue = document.querySelector("#" + direction + "-" + clueNumber);
  actualClue.classList.add("clue-selected");
}

// when all inputs have a value, check if answer is correct
function checkAnswer() {
  const user_answer = Array.from(inputs)
    .map((input) => input.value)
    .join("");

  if (user_answer === answer) {
    console.log("We have a winner!!!");
  }
}
