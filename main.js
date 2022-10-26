"use strict";

let boardSize = parseInt(document.getElementById("boardSize").value);
createGrid(boardSize);

let color = "black";
let click = false;

let board = document.querySelector(".board");
let boardCells = board.querySelectorAll("div");

const penColor = document.getElementById("penColor");
const blackPen = document.getElementById("blackPen");
const eraser = document.getElementById("eraser");
const toggleButton = document.getElementById("toggle");
const reset = document.getElementById("reset");

//
document.getElementById("boardSize").addEventListener("input", createGrid);
document.getElementById("boardSize").addEventListener("input", printCellCount);
document.getElementById("boardSize").addEventListener("input", updateBoardSize);
document
  .getElementById("boardSize")
  .addEventListener("input", updateboardCells);

// Left Pane Options
toggleButton.addEventListener("click", toggleGridLines);
reset.addEventListener("click", resetBoard);
blackPen.addEventListener("click", () => changePenColor("#000000"));
eraser.addEventListener("click", () => changePenColor("#ffffff"));
penColor.addEventListener("input", (e) => changePenColor(e.target.value));

document.querySelector(".main-content").addEventListener("mousedown", (e) => {
  e.preventDefault();
  click = true;
});
document.querySelector("body").addEventListener("mouseup", (e) => {
  click = false;
});

function createGrid() {
  let board = document.querySelector(".board");
  let boardCells = board.querySelectorAll("div");
  boardCells.forEach((div) => div.remove());
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

  for (let i = 0; i < boardSize * boardSize; i++) {
    let singleCell = document.createElement("div");
    singleCell.className = "square";
    singleCell.addEventListener("mouseover", paintCell);
    singleCell.addEventListener("mousedown", paintCell);
    board.append(singleCell);
  }
}

function printCellCount() {
  let boardSize = document.getElementById("boardSize").value;
  let boardGrid = document.getElementById("board-grid");
  boardGrid.textContent = boardSize + "x" + boardSize;
}

function updateBoardSize() {
  boardSize = parseInt(document.getElementById("boardSize").value);
}
function updateboardCells() {
  boardCells = board.querySelectorAll("div");
}

function resetBoard() {
  boardCells.forEach((div) => (div.style.backgroundColor = "white"));
}

function toggleGridLines() {
  if (boardCells[0].className) {
    boardCells.forEach((div) => div.classList.remove("square"));
  } else {
    boardCells.forEach((div) => div.classList.add("square"));
  }
}

function paintCell(e) {
  if (e.type === "mouseover" && !click) return;
  e.target.style.backgroundColor = color;
}

function changePenColor(newColor) {
  color = newColor;
  penColor.value = color;
}
